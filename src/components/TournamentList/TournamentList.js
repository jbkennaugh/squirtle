import { intervalCollection } from "time-events-manager";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { isTokenExpired } from "../../util/authentication";
import { getTournamentsWithAdmin } from "../../util/queries";
import { navigateTo } from "../../util/navigate";

const TournamentList = ({ setSelectedTournament, logout }) => {
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
      <button className="absolute bottom-7 right-10" onClick={logout}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
          strokeWidth={1.5}
          className="w-16"
          stroke="#fa0000"
        >
          <path
            fill="#fa0000"
            d="M502.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L402.7 224 192 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l210.7 0-73.4 73.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l128-128zM160 96c17.7 0 32-14.3 32-32s-14.3-32-32-32L96 32C43 32 0 75 0 128L0 384c0 53 43 96 96 96l64 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-64 0c-17.7 0-32-14.3-32-32l0-256c0-17.7 14.3-32 32-32l64 0z"
          />
        </svg>
      </button>
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
