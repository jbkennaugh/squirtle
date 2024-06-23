import "./App.css";
import { Route, Routes } from "react-router-dom";
import SetReporter from "./components/SetReporter/SetReporter";
import StreamQueue from "./components/StreamQueue/StreamQueue";
import TournamentList from "./components/TournamentList/TournamentList";
import * as queries from "./util/queries";

import { useEffect, useState } from "react";
import Login from "./components/Login/Login";

function App() {
  const [selectedTournament, setSelectedTournament] = useState();
  const [selectedSet, setSelectedSet] = useState();

  useEffect(() => {
    if (selectedSet) {
      queries.markSetInProgress(selectedSet.id);
    }
  }, [selectedSet]);

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
      <Routes>
        <Route path="/login" Component={Login} />
        <Route
          path="/tournamentList"
          element={
            <TournamentList
              tournament={setSelectedTournament}
              setSelectedTournament={setSelectedTournament}
            />
          }
        />
        <Route // will redirect to login if auth token does not exist
          path="/"
          element={<StreamQueue setSelectedSet={setSelectedSet} />}
        />
        <Route
          path="/streamQueue"
          element={
            <StreamQueue
              tournament={selectedTournament}
              setSelectedSet={setSelectedSet}
            />
          }
        />
        <Route
          path="/setReporter"
          element={<SetReporter set={selectedSet} />}
        />
      </Routes>
    </div>
  );
}

export default App;
