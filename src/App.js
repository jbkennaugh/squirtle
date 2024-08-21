import Login from "./components/Login/Login";
import SetReporter from "./components/SetReporter/SetReporter";
import Sidebar from "./components/Sidebar/Sidebar";
import StreamQueue from "./components/StreamQueue/StreamQueue";
import TournamentList from "./components/TournamentList/TournamentList";

import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { markSetInProgress } from "./util/queries";

function App() {
  const [selectedTournament, setSelectedTournament] = useState();
  const [selectedSet, setSelectedSet] = useState();

  useEffect(() => {
    if (selectedSet) {
      markSetInProgress(selectedSet.id);
    }
  }, [selectedSet]);

  return (
    <div className="App">
      <Sidebar />
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
              setTournament={setSelectedTournament}
              tournament={selectedTournament}
            />
          }
        />
        <Route
          path="/streamQueue"
          element={
            <StreamQueue
              setSelectedSet={setSelectedSet}
              setTournament={setSelectedTournament}
              tournament={selectedTournament}
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
