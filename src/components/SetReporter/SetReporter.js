import backArrow from "../../media/back-arrow.png";

import { useEffect, useState } from "react";
import Counterpick from "../Counterpick/Counterpick";
import WinReporter from "../WinReporter/WinReporter";

const SetReporter = ({ set, setActiveDiv }) => {
  const [counterpickDone, setCounterpickDone] = useState(false);
  const [player1Name] = useState(set.slots[0].entrant.participants[0].gamerTag);
  const [player2Name] = useState(set.slots[1].entrant.participants[0].gamerTag);
  const [gameNumber, setGameNumber] = useState(1);
  const [gameWinner, setGameWinner] = useState();
  const [selectedStage, setSelectedStage] = useState();

  useEffect(() => {
    console.log(`Player ${gameWinner} wins game ${gameNumber}`);
    if (gameWinner) {
      setGameNumber(gameNumber + 1);
    }
  }, [gameWinner]);

  return (
    <div>
      {counterpickDone ? (
        <div className="w-1/2 mx-auto">
          <div
            className="back-to-char-select flex absolute items-center cursor-pointer top-7 left-5"
            onClick={() => setActiveDiv("streamQueue")}
          >
            <img src={backArrow} alt="Back arrow." width="50px"></img>
            <h1 className="text-2xl">Re-select</h1>
          </div>
          <h1 className="text-6xl py-5 mb-10 text-center">{`Game ${gameNumber} on ${selectedStage}`}</h1>
          <div className="flex flex-col">
            <div className="flex  justify-center gap-5 border-y-4 py-10 border-[darkgreen]">
              <WinReporter
                player={1}
                playerName={player1Name}
                setGameWinner={setGameWinner}
              ></WinReporter>
              <WinReporter
                player={2}
                playerName={player2Name}
                setGameWinner={setGameWinner}
              ></WinReporter>
            </div>
            <p className="text-center mt-3 text-3xl hover:cursor-pointer hover:text-[darkgreen]">
              Submit Scores
            </p>
          </div>
        </div>
      ) : (
        <Counterpick
          set={set}
          gameNumber={gameNumber}
          setActiveDiv={setActiveDiv}
          setCounterpickDone={setCounterpickDone}
          selectedStage={selectedStage}
          setSelectedStage={setSelectedStage}
        ></Counterpick>
      )}
    </div>
  );
};

export default SetReporter;
