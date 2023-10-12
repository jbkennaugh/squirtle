import "./App.css";
import refreshIcon from "./media/icons8-refresh-50.png";
import SetReporter from "./components/SetReporter/SetReporter";
import StreamQueue from "./components/StreamQueue/StreamQueue";
import { useEffect, useState } from "react";

function App() {
  const [activeDiv, setActiveDiv] = useState("streamQueue");
  const [selectedSet, setSelectedSet] = useState();

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
        ></SetReporter>
      )}
    </div>
  );
}

export default App;
