import "./style.css";
import * as queries from "../../util/queries";
import { useState } from "react";

const StreamQueue = ({ setSelectedSet }) => {
  const [sets, updateSets] = useState(null);
  const [isLoading, setLoading] = useState(true);

  if (!sets) {
    queries.getStreamQueueByTournament(queries.getWeeklyName()).then((res) => {
      updateSets(res);
      setLoading(false);
    });
  }

  const handleSetSelection = (set) => {
    setSelectedSet(set);
  };

  return (
    <div className="container w-2/3 mx-auto">
      <ul className="stream-queue">
        {isLoading ? (
          <h1 className="text-4xl py-5 text-center text-white">
            Loading sets...
          </h1>
        ) : // <img src="./loading.gif" alt="loading icon"></img>
        sets == null ? (
          <h1 className="text-4xl py-5 text-center text-white">
            No sets queued for stream.
          </h1>
        ) : (
          sets.map((set) => {
            return (
              <li
                className={
                  "stream-set py-5 my-3 rounded-lg flex flex-col text-center space-y-5 bg-[#77CA00] border-4 border-transparent" +
                  (set.slots[0].entrant && set.slots[1].entrant
                    ? " hover:border-black hover:cursor-pointer"
                    : "")
                }
                onClick={
                  set.slots[0].entrant && set.slots[1].entrant
                    ? () => handleSetSelection(set)
                    : null
                }
              >
                <div className="round text-3xl">{`${set.fullRoundText}`}</div>
                <div className="flex justify-around pb-5">
                  {set.slots[0].entrant ? (
                    <div className="entrant">
                      <p className="text-2xl">{`${set.slots[0].entrant.name}`}</p>
                      <p className="text-xl text-gray-600">{`seed: ${set.slots[0].entrant.seeds[0].seedNum}`}</p>
                    </div>
                  ) : (
                    <div className="entrant">
                      <p className="text-2xl">To be decided.</p>
                    </div>
                  )}
                  {set.slots[1].entrant ? (
                    <div className="entrant">
                      <p className="text-2xl">{`${set.slots[1].entrant.name}`}</p>
                      <p className="text-xl text-gray-600">{`seed: ${set.slots[1].entrant.seeds[0].seedNum}`}</p>
                    </div>
                  ) : (
                    <div className="entrant">
                      <p className="text-2xl">To be decided.</p>
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
