import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getStreamQueueByEvent } from "../../util/queries";
import { isTokenExpired } from "../../util/authentication";
import { navigateTo } from "../../util/navigate";

const StreamQueue = ({ setSelectedSet, tournament }) => {
  const navigate = useNavigate();
  const [sets, updateSets] = useState();
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    isTokenExpired().then((isExpired) =>
      isExpired ? navigateTo(navigate, "/login") : init()
    );
  }, []);

  const init = () => {
    if (!tournament) {
      navigateTo(navigate, "/tournamentList");
    }
    if (!sets) {
      getStreamQueueByEvent(tournament.name, tournament.eventId).then((res) => {
        updateSets(res);
        setLoading(false);
      });
    }
    // updates sets every 5 seconds
    setInterval(() => {
      getStreamQueueByEvent(tournament.name, tournament.eventId).then((res) => {
        updateSets(res);
      });
    }, 5 * 1000);
  };

  return (
    <div className="container w-2/3 mx-auto">
      <div
        className="flex absolute items-center cursor-pointer top-7 left-5"
        onClick={() => {
          navigateTo(navigate, "/tournamentList");
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 25 25"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-12"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
          />
        </svg>
        <h1 className="text-2xl">Select event</h1>
      </div>
      {tournament && (
        <h1 className="text-5xl text-mpprimary py-5 text-center">{`${tournament.name} (${tournament.eventName})`}</h1>
      )}
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
                        navigateTo(navigate, "/setReporter");
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
