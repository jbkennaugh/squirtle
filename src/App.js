import "./App.css";
import refreshIcon from "./media/refresh.png";
import SetReporter from "./components/SetReporter/SetReporter";
import StreamQueue from "./components/StreamQueue/StreamQueue";
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
   *  games: [
   *    {
   *      winner: "playerId",
   *      player1Character: "someCharacterId",
   *      player2Character: "someOtherCharacterId",
   *      stage: "someStageId"
   *    },
   *    {
   *      winner: "playerId",
   *      player1Character: "someCharacterId",
   *      player2Character: "someOtherCharacterId",
   *      stage: "someStageId"
   *    },
   *  ],
   * }
   */
  const [setData, updateSetData] = useState([]);

  useEffect(() => {
    if (selectedSet) {
      setActiveDiv("setChosen");
    }
  }, [selectedSet]);

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
      {activeDiv === "scoreReported" && <div></div>}
    </div>
  );
}

export default App;
