import backArrow from "../../media/back-arrow.png";

import { useEffect, useState } from "react";
import Counterpick from "../Counterpick/Counterpick";
import WinReporter from "../WinReporter/WinReporter";

const SetReporter = ({ set, setActiveDiv, updateGameData }) => {
  const [counterpickDone, setCounterpickDone] = useState(false);
  const [player1Name] = useState(set.slots[0].entrant.participants[0].gamerTag);
  const [player2Name] = useState(set.slots[1].entrant.participants[0].gamerTag);
  const [player1Wins, increasePlayer1Wins] = useState(0);
  const [player2Wins, increasePlayer2Wins] = useState(0);
  const [gameNumber, setGameNumber] = useState(1);
  const [bestOf, setBestOf] = useState();
  const [gameWinner, setGameWinner] = useState();
  const [confirmedGamesData, updateConfirmedGamesData] = useState([]);
  const [selectedStage, setSelectedStage] = useState();

  useEffect(() => {
    if (confirmedGamesData[gameNumber - 1]) {
      console.log(
        `Player ${
          confirmedGamesData[gameNumber - 1]
        } wins game ${gameNumber}, resetting states`
      );
      setGameWinner(null);
      setCounterpickDone(false);
      if (player1Wins === bestOf || player2Wins === bestOf) {
        const winnerId =
          player1Wins > player2Wins
            ? set.slots[0].entrant.id
            : set.slots[1].entrant.id;
        const setData = {
          setId: set.id,
          winnerId: winnerId,
          games: confirmedGamesData,
        };

        updateGameData(setData);
        setActiveDiv("streamQueue");
      } else {
        setGameNumber(gameNumber + 1);
      }
    }
  }, [confirmedGamesData]);

  const handleConfirmedWinner = () => {
    if (gameWinner) {
      const gameInfo = {
        winner: set.slots[gameWinner - 1].entrant.id,
        player1Character: "someCharacterId",
        player2Character: "someOtherCharacterId",
        stage: "someStageId",
      };
      updateConfirmedGamesData([...confirmedGamesData, gameInfo]);
      if (gameWinner === 1) {
        increasePlayer1Wins(player1Wins + 1);
      } else {
        increasePlayer2Wins(player2Wins + 1);
      }
    } else {
      console.log("Please select a winner first.");
    }
  };

  return (
    <div>
      {bestOf ? (
        <>
          {counterpickDone ? (
            <div className="w-1/2 mx-auto">
              <div
                className="back-to-char-select flex absolute items-center cursor-pointer top-7 left-5"
                onClick={() => setBestOf(null)}
              >
                <img src={backArrow} alt="Back arrow." width="50px"></img>
                <h1 className="text-2xl">Re-select</h1>
              </div>
              <h1 className="text-6xl py-5 mb-10 text-center">{`Game ${gameNumber} on ${selectedStage}`}</h1>
              <div className="flex flex-col">
                <ul className="grid w-full gap-6 md:grid-cols-2">
                  <WinReporter
                    player={1}
                    playerName={player1Name}
                    gameWinner={gameWinner}
                    setGameWinner={setGameWinner}
                  ></WinReporter>
                  <WinReporter
                    player={2}
                    playerName={player2Name}
                    gameWinner={gameWinner}
                    setGameWinner={setGameWinner}
                  ></WinReporter>
                </ul>
                <button
                  type="button"
                  className=" hover:text-mpsecondary border border-mpprimary hover:bg-mpprimary rounded-lg px-5 py-2.5 mt-2 text-center text-2xl mr-2"
                  onClick={handleConfirmedWinner}
                >
                  {`Confirm game #${gameNumber} winner`}
                </button>
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
        </>
      ) : (
        <div className="w-1/2 mx-auto">
          <div
            className="back-to-char-select flex absolute items-center cursor-pointer top-7 left-5"
            onClick={() => setActiveDiv("streamQueue")}
          >
            <img src={backArrow} alt="Back arrow." width="50px"></img>
            <h1 className="text-2xl">Re-select</h1>
          </div>
          <h1 className="text-6xl py-5 mb-10 text-center">Select Set Length</h1>
          <div className="flex gap-5">
            <div
              className="w-full p-5 rounded-lg cursor-pointer border-2 bg-gray-800 hover:border-mpprimary hover:text-mpprimary border-gray-700 text-gray-400"
              onClick={() => setBestOf(3)}
            >
              <div className="flex justify-between items-center">
                <div className="w-full text-3xl font-bold">Best of 3</div>
              </div>
            </div>
            <div
              className="w-full p-5 rounded-lg cursor-pointer border-2 bg-gray-800 hover:border-mpprimary hover:text-mpprimary border-gray-700 text-gray-400"
              onClick={() => setBestOf(5)}
            >
              <div className="flex justify-between items-center">
                <div className="w-full text-3xl font-bold">Best of 5</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SetReporter;
