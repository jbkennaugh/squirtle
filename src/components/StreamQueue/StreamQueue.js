import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { intervalCollection } from "time-events-manager";

import * as queries from "../../util/queries";
import * as auth from "../../util/authentication";

const StreamQueue = ({ setSelectedSet, tournament }) => {
  const navigate = useNavigate();
  const [sets, updateSets] = useState();
  const [isLoading, setLoading] = useState(true);
  const weeklyName = process.env.REACT_APP_TEST_MODE
    ? "ep-testing"
    : queries.getWeeklyName();

  useEffect(() => {
    auth
      .isTokenExpired()
      .then((isExpired) => (isExpired ? navigate("/login") : null));
    if (!tournament) {
      navigate("/tournamentList");
    }
    if (!sets) {
      queries.getStreamQueueByTournament(weeklyName).then((res) => {
        updateSets(res);
        setLoading(false);
      });
    }
    // updates sets every 5 seconds
    setInterval(() => {
      queries.getStreamQueueByTournament(weeklyName).then((res) => {
        updateSets(res);
      });
    }, 5 * 1000);
  }, []);

  return (
    <div className="container w-2/3 mx-auto">
      <h1 className="text-5xl text-mpprimary py-5 text-center">{`${tournament.name} (${tournament.eventName}) Stream Sets:`}</h1>
      <ul className="stream-queue">
        {isLoading ? (
          <h1 className="text-4xl py-5 text-center text-white">
            Loading sets...
          </h1>
        ) : sets == null ? (
          <h1 className="text-4xl py-5 text-center text-white">
            No sets queued for stream.
          </h1>
        ) : (
          sets.map((set) => {
            const player1Name = set.slots[0].entrant?.participants[0].gamerTag;
            const player2Name = set.slots[1].entrant?.participants[0].gamerTag;
            return (
              <li
                className={
                  "stream-set py-5 my-3 rounded-lg flex flex-col text-center space-y-5 border-4 border-transparent text-mpsecondary" +
                  (set.slots[0].entrant && set.slots[1].entrant
                    ? " bg-mpprimary hover:border-mpprimarydark hover:cursor-pointer"
                    : " bg-gray-500")
                }
                onClick={
                  set.slots[0].entrant && set.slots[1].entrant
                    ? () => {
                        setSelectedSet(set);
                        intervalCollection.removeAll();
                        navigate("/setReporter");
                      }
                    : null
                }
                key={`${player1Name}Vs${player2Name}Rnd${set.fullRoundText}`}
              >
                <div className="round text-3xl">{`${set.fullRoundText}`}</div>
                <div className="flex justify-around pb-5">
                  {set.slots[0].entrant ? (
                    <div className="entrant">
                      <p className="text-2xl">{`${player1Name}`}</p>
                      <p className="text-xl text-gray-600">{`seed: ${set.slots[0].entrant.seeds[0].seedNum}`}</p>
                    </div>
                  ) : (
                    <div className="entrant">
                      <p className="text-2xl text-red-500">To be decided.</p>
                    </div>
                  )}
                  {set.slots[1].entrant ? (
                    <div className="entrant">
                      <p className="text-2xl">{`${player2Name}`}</p>
                      <p className="text-xl text-gray-600">{`seed: ${set.slots[1].entrant.seeds[0].seedNum}`}</p>
                    </div>
                  ) : (
                    <div className="entrant">
                      <p className="text-2xl text-red-500">To be decided.</p>
                    </div>
                  )}
                </div>
              </li>
            );
          })
        )}
      </ul>
    </div>
  );
};

export default StreamQueue;
