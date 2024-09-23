import { intervalCollection } from "time-events-manager";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { isTokenExpired } from "../../util/authentication";
import { getTournamentsWithAdmin } from "../../util/queries";
import { navigateTo } from "../../util/navigate";

const TournamentList = ({ setSelectedTournament }) => {
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(true);
  const [tournaments, updateTournaments] = useState();

  useEffect(() => {
    isTokenExpired().then((isExpired) =>
      isExpired ? navigateTo(navigate, "/login") : init()
    );
  });

  const handleTournamentSelection = (tournament) => {
    console.log("tournament selected", tournament);
    if (tournament.id) {
      setSelectedTournament(tournament);
      Cookies.set("selected_event_slug", tournament.event.slug);
      navigateTo(navigate, "/streamQueue");
    }
  };

  const init = () => {
    if (!tournaments) {
      getTournamentsWithAdmin().then((tournaments) => {
        updateTournaments(tournaments);
        setLoading(false);
      });
    }
    if (intervalCollection.getAll().length === 0) {
      // updates tournaments every 10 seconds - check ensures it isn't added many times
      setInterval(() => {
        getTournamentsWithAdmin().then((tournaments) => {
          updateTournaments(tournaments);
        });
      }, 10 * 1000);
    }
  };

  return (
    <div className="container w-2/3 mx-auto">
      <h1 className="text-5xl text-mpprimary py-5 text-center">
        Select tournament
      </h1>
      <ul className="stream-queue">
        {isLoading ? (
          <h1 className="text-4xl py-5 text-center text-white">
            Loading tournaments...
          </h1>
        ) : tournaments == null ? (
          <h1 className="text-4xl py-5 text-center text-white">
            No tournaments with admin for current user.
          </h1>
        ) : (
          tournaments.map((tournament) => {
            console.log(tournament)
            return (
              <li
                className={
                  "stream-set py-5 my-3 rounded-lg flex flex-col text-center space-y-5 border-4 border-transparent text-mpsecondary bg-mpprimary hover:border-mpprimarydark hover:cursor-pointer"
                }
                onClick={() => handleTournamentSelection(tournament)}
                key={`${tournament.name}-${tournament.event.name}`}
              >
                <div className="round text-3xl">{`${tournament.name}`}</div>
                <div className="flex justify-around pb-5">
                  <div className="entrant">
                    <p className="text-2xl">{`${tournament.event.name}`}</p>
                  </div>
                </div>
              </li>
            );
          })
        )}
      </ul>
    </div>
  );
};

export default TournamentList;
