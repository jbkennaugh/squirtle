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
      <Routes>
        <Route path="/login" Component={Login} />
        <Route
          path="/tournamentList"
          element={
            <TournamentList setSelectedTournament={setSelectedTournament} />
          }
        />
        <Route // will redirect to login if auth token does not exist
          path="/"
          element={
            <StreamQueue
              setSelectedSet={setSelectedSet}
              tournament={selectedTournament}
            />
          }
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
