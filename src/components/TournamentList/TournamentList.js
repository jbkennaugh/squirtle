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
          <h1 className="text-4xl py-5 text-center text-mpprimary">
            Loading tournaments...
          </h1>
        ) : tournaments.length === 0 ? (
          <>
            <h1 className="text-4xl py-5 text-center text-mpprimary">
              No tournaments found.
            </h1>
            <div className="flex items-center justify-center">
              <h1 className="text-2xl py-5 mx-4 text-center text-mpprimary">
                Search:
                <input
                  className="pl-2 ml-2 rounded-md"
                  type="text"
                  placeholder="slug"
                ></input>
              </h1>
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                height="2em"
                width="2em"
              >
                <path d="M12 6a3.939 3.939 0 00-3.934 3.934h2C10.066 8.867 10.934 8 12 8s1.934.867 1.934 1.934c0 .598-.481 1.032-1.216 1.626a9.208 9.208 0 00-.691.599c-.998.997-1.027 2.056-1.027 2.174V15h2l-.001-.633c.001-.016.033-.386.441-.793.15-.15.339-.3.535-.458.779-.631 1.958-1.584 1.958-3.182A3.937 3.937 0 0012 6zm-1 10h2v2h-2z" />
                <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z" />
              </svg>
            </div>
          </>
        ) : (
          tournaments.map((tournament) => {
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
