import "./App.css";
import SetReporter from "./components/SetReporter/SetReporter";
import StreamQueue from "./components/StreamQueue/StreamQueue";
import * as queries from "./util/queries";

import { useEffect, useState } from "react";

function App() {
  const [activeDiv, setActiveDiv] = useState("streamQueue");
  const [selectedSet, setSelectedSet] = useState();
  /**
   * Information pushed to setData should be an object with all the data about a set, in the format:
   * {
   *  setId: someInt,
   *  winnerId: "setWinningPlayerId",
   *  // ordered array from game 1 onwards with info of each game
   *  "gameData": [
        {
          "winnerId": "setWinnersID",
          "gameNum": 1,
          "stageId": 3,
          "selections": [
            {
              "entrantId": player1ID,
              "characterId": player2CharacterIDGame1
            },
            {
              "entrantId": player2ID,
              "characterId": player2CharacterIDGame1
            }
          ]
        },
        {
          "winnerId": 14259653,
          "gameNum": 2,
          "entrant1Score": 0,
          "entrant2Score": 3,
          "selections": [
            {
              "entrantId": player1ID,
              "characterId": player2CharacterIDGame2
            },
            {
              "entrantId": player2ID,
              "characterId": player2CharacterIDGame2
            }
          ]
        }
      ],
   * }
   */
  const [setData, updateSetData] = useState({});

  useEffect(() => {
    if (selectedSet) {
      setActiveDiv("setChosen");
    }
  }, [selectedSet]);

  useEffect(() => {
    if (Object.keys(setData).length !== 0) {
      queries.reportSet(setData);
      if (setData.winnerId) {
        setActiveDiv("scoreReported");
        setTimeout(() => {
          setActiveDiv("streamQueue");
        }, 10000);
      }
    }
  }, [setData]);

  return (
    <div className="App">
      <button
        className="absolute top-7 right-10"
        onClick={() => {
          window.location.reload(false);
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-16"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
          />
        </svg>
      </button>
      {activeDiv === "streamQueue" && (
        <StreamQueue setSelectedSet={setSelectedSet}></StreamQueue>
      )}
      {activeDiv === "setChosen" && (
        <SetReporter
          set={selectedSet}
          setActiveDiv={setActiveDiv}
          updateSetData={updateSetData}
        ></SetReporter>
      )}
      {activeDiv === "scoreReported" && (
        <div className="container w-2/3 mx-auto">
          <h1 className="text-center text-6xl mt-[40vh]">
            Set reported. Returning to stream queue!
          </h1>
        </div>
      )}
    </div>
  );
}

export default App;
