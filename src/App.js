import "./App.css";
import CounterPick from "./components/CounterPick/CounterPick";
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
      <h1 className="text-6xl py-5 text-center text-[#77CA00]">Stream Sets:</h1>
      {activeDiv === "streamQueue" && (
        <StreamQueue setSelectedSet={setSelectedSet}></StreamQueue>
      )}
      {activeDiv === "setChosen" && (
        <CounterPick set={selectedSet}></CounterPick>
      )}
    </div>
  );
}

export default App;
