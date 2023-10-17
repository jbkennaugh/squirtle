import "./App.css";
import refreshIcon from "./media/refresh.png";
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
      console.log(setData);
      console.log(JSON.stringify(setData));
      queries.reportSet(setData);
      setActiveDiv("scoreReported");
      setTimeout(() => {
        setActiveDiv("streamQueue");
      }, 10000);
    }
  }, [setData]);

  return (
    <div className="App">
      <button
        className="absolute top-7 right-10"
        onClick={() => {
          window.location.reload(false);
          // getCharacterData().then((data) => console.log(data));
        }}
      >
        <img src={refreshIcon} alt="Refresh icon."></img>
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
