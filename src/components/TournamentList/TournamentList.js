import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { intervalCollection } from "time-events-manager";

import * as auth from "../../util/authentication";
import * as queries from "../../util/queries";

const TournamentList = ({ tournament, setSelectedTournament }) => {
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(true);
  const [tournaments, updateTournaments] = useState();

  useEffect(() => {
    auth
      .isTokenExpired()
      .then((isExpired) => (isExpired ? navigate("/login") : null));

    if (!tournament) {
      queries.getTournamentsWithAdmin().then((tournaments) => {
        updateTournaments(tournaments);
        setLoading(false);
      });
    }
    // updates tournaments every 30 seconds
    setInterval(() => {
      queries.getTournamentsWithAdmin().then((tournaments) => {
        updateTournaments(tournaments);
      });
    }, 30 * 1000);
  }, []);

  return (
    <div className="container w-2/3 mx-auto">
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
                onClick={
                  tournament.id
                    ? () => {
                        setSelectedTournament(tournament);
                        intervalCollection.removeAll();
                        navigate("/streamQueue");
                      }
                    : null
                }
                key={`${tournament.name}-${tournament.eventName}`}
              >
                <div className="round text-3xl">{`${tournament.name}`}</div>
                <div className="flex justify-around pb-5">
                  <div className="entrant">
                    <p className="text-2xl">{`${tournament.eventName}`}</p>
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
