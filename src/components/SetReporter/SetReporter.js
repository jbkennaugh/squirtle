import counterpicks from "../../data/counterpicks.json";

import { useEffect, useState } from "react";
import Counterpick from "../../pages/Counterpick/counterpick";
import WinReporter from "../WinReporter/WinReporter";
import * as queries from "../../util/queries";
import { useNavigate } from "react-router-dom";

const SetReporter = ({ set }) => {
  const navigate = useNavigate();
  const [counterpickDone, setCounterpickDone] = useState(false);
  const [player1Name, setP1Name] = useState();
  const [player2Name, setP2Name] = useState();
  const [player1Wins, increasePlayer1Wins] = useState(0);
  const [player2Wins, increasePlayer2Wins] = useState(0);
  const [gameNumber, setGameNumber] = useState(1);
  const [bestOf, setBestOf] = useState();
  const [gameWinner, setGameWinner] = useState();
  const [previousGameData, setPreviousGameData] = useState();
  const [confirmedGamesData, updateConfirmedGamesData] = useState([]);
  const [selectedStage, setSelectedStage] = useState();
  const [setReported, isSetReported] = useState(false);
  const [characters, setCharacters] = useState({
    player1: [],
    player2: [],
  });
  const [setData, updateSetData] = useState({});

  useEffect(() => {
    if (!set) {
      navigate("/streamQueue");
    } else {
      setP1Name(set.slots[0].entrant.participants[0].gamerTag);
      setP2Name(set.slots[1].entrant.participants[0].gamerTag);
    }
  }, []);

  useEffect(() => {
    if (Object.keys(setData).length !== 0) {
      queries.reportSet(setData);
      if (setData.winnerId) {
        isSetReported(true);
        setTimeout(() => {
          navigate("/streamQueue");
        }, 10000);
      }
    }
  }, [setData]);

  useEffect(() => {
    if (confirmedGamesData[gameNumber - 1]) {
      console.log(
        `Player ${
          confirmedGamesData[gameNumber - 1].winner
        } wins game ${gameNumber}, resetting states`
      );
      setGameWinner(null);
      setCounterpickDone(false);
      setSelectedStage(null);
      const maxWins = Math.ceil(bestOf / 2);
      const setData = {
        setId: set.id,
        gameData: confirmedGamesData,
      };
      if (player1Wins === maxWins || player2Wins === maxWins) {
        const winnerId =
          player1Wins > player2Wins
            ? set.slots[0].entrant.id
            : set.slots[1].entrant.id;
        setData.winnerId = winnerId;
        setPreviousGameData({});
      } else {
        setGameNumber((gameNumber) => gameNumber + 1);
      }
      updateSetData(setData);
    }
  }, [confirmedGamesData]);

  const handleBackButton = () => {
    queries.resetSet(set.id).then((res) => console.log(res));
    if (bestOf) {
      setCounterpickDone(false);
      setSelectedStage(null);
    } else {
      navigate("/streamQueue");
    }
  };

  const handleConfirmedWinner = () => {
    if (gameWinner) {
      const character1Id =
        counterpicks.characters[`${characters.player1[gameNumber - 1]}`].id;
      const character2Id =
        counterpicks.characters[`${characters.player2[gameNumber - 1]}`].id;
      const stageId = counterpicks.stageInfo[`${selectedStage}`];

      const gameInfo = {
        winnerId: set.slots[gameWinner - 1].entrant.id,
        gameNum: gameNumber,
        stageId: stageId,
        selections: [
          {
            entrantId: set.slots[0].entrant.id,
            characterId: character1Id,
          },
          {
            entrantId: set.slots[1].entrant.id,
            characterId: character2Id,
          },
        ],
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
    <div className="mt-[15vh]">
      <div className="w-3/4 mx-auto">
        {!setReported ? (
          <>
            <div
              className="flex absolute items-center cursor-pointer top-7 left-5"
              onClick={handleBackButton}
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
              <h1 className="text-2xl">
                {counterpickDone
                  ? `Redo game #${gameNumber} bans`
                  : "Reselect set"}
              </h1>
            </div>
            {bestOf ? (
              <>
                {counterpickDone ? (
                  <>
                    <h1 className="text-6xl py-5 text-center">{`Game ${gameNumber}`}</h1>
                    <h1 className="text-4xl py-5 text-center">{`${selectedStage}`}</h1>
                    <div className="flex flex-col">
                      <ul className="grid w-full gap-6 md:grid-cols-2">
                        <WinReporter
                          player={1}
                          playerName={player1Name}
                          playerCharacter={characters.player1[gameNumber - 1]}
                          gameWinner={gameWinner}
                          setGameWinner={setGameWinner}
                        ></WinReporter>
                        <WinReporter
                          player={2}
                          playerName={player2Name}
                          playerCharacter={characters.player2[gameNumber - 1]}
                          gameWinner={gameWinner}
                          setGameWinner={setGameWinner}
                        ></WinReporter>
                      </ul>
                      <button
                        type="button"
                        className="text-mpsecondary border border-mpprimary bg-mpprimary rounded-lg px-5 py-2.5 mt-2 text-center text-2xl mr-2"
                        onClick={handleConfirmedWinner}
                      >
                        {`Confirm game #${gameNumber} winner`}
                      </button>
                    </div>
                  </>
                ) : (
                  <Counterpick
                    set={set}
                    gameNumber={gameNumber}
                    setCounterpickDone={setCounterpickDone}
                    selectedStage={selectedStage}
                    setSelectedStage={setSelectedStage}
                    characters={characters}
                    setCharacters={setCharacters}
                    previousGameData={previousGameData}
                    setPreviousGameData={setPreviousGameData}
                    bestOf={bestOf}
                    setBestOf={setBestOf}
                  ></Counterpick>
                )}
              </>
            ) : (
              <>
                <h1 className="text-6xl py-5 mb-10 text-center">
                  Select Set Length
                </h1>
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
              </>
            )}
          </>
        ) : (
          <h1 className="text-center text-6xl mt-[40vh]">
            Set reported. Returning to stream queue!
          </h1>
        )}
      </div>
    </div>
  );
};

export default SetReporter;
