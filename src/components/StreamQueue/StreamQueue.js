import "./style.css";
import * as queries from "../../util/queries";
import { useState } from "react";

const StreamQueue = ({ setSelectedSet }) => {
  const [sets, updateSets] = useState(null);

  if (!sets) {
    queries.getStreamQueueByTournament("meltingpoint-148").then((res) => {
      console.log(res);
      updateSets(res);
    });
  }

  const handleSetSelection = (set) => {
    setSelectedSet(set);
  };

  return (
    <div className="container w-2/3 mx-auto">
      <ul className="stream-queue">
        {sets != null &&
          sets.map((set) => {
            return (
              <li
                className="stream-set py-5 my-3 rounded-lg flex flex-col text-center space-y-5 bg-[#77CA00] hover:cursor-pointer border-4 border-transparent hover:border-black"
                onClick={() => handleSetSelection(set)}
              >
                <div className="round text-3xl">{`${set.fullRoundText}`}</div>
                <div className="flex justify-around text-3xl pb-5">
                  <div className="entrant">{`${set.slots[0].entrant.name}`}</div>
                  <div className="entrant">{`${set.slots[1].entrant.name}`}</div>
                </div>
              </li>
            );
          })}
      </ul>
    </div>
  );
};

export default StreamQueue;
