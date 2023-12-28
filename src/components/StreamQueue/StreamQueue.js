import "./style.css";
import * as queries from "../../util/queries";
import { useState } from "react";

const StreamQueue = ({ setSelectedSet }) => {
  const [sets, updateSets] = useState(null);
  const [isLoading, setLoading] = useState(true);

  // very temporary function to allow it to know which MeltingPoint weekly it is being used for
  // before making it get it from a selected tournament.
  const getTournamentName = () => {
    const weeklyName = queries.getWeeklyName();
    let tournamentName = "";
    weeklyName.split("-").forEach((word) => {
      word = word.charAt(0).toUpperCase() + word.slice(1);
      tournamentName += word + " ";
    });
    return tournamentName;
  };

  if (!sets) {
    queries.getStreamQueueByTournament("snoverdrive-2023").then((res) => {
      updateSets(res);
      setLoading(false);
    });
  }

  return (
    <div className="container w-2/3 mx-auto">
      <h1 className="text-5xl py-5 text-center">{`Snoverdrive Stream Sets:`}</h1>
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
                    ? " bg-mpprimary hover:border-green-950 hover:cursor-pointer"
                    : " bg-gray-500")
                }
                onClick={
                  set.slots[0].entrant && set.slots[1].entrant
                    ? () => setSelectedSet(set)
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
