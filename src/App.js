import "./App.css";
import Login from "./pages/Login/login";
import SetReporter from "./components/SetReporter/SetReporter";
import { Sidebar } from "./components/Sidebar/sidebar";
import StreamQueue from "./components/StreamQueue/StreamQueue";
import TournamentList from "./components/TournamentList/TournamentList";

import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { markSetInProgress } from "./util/queries";
import { isTokenExpired } from "./util/authentication";

function App() {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [selectedTournament, setSelectedTournament] = useState();
  const [selectedSet, setSelectedSet] = useState();

  useEffect(() => {
    if (selectedSet) {
      markSetInProgress(selectedSet.id);
    }
  }, [selectedSet]);

  useEffect(() => {
    isTokenExpired().then((isExpired) =>
      isExpired ? setLoggedIn(false) : setLoggedIn(true)
    );
  });

  return (
    <div className="App">
      <Sidebar isLoggedIn={isLoggedIn} setLoggedIn={setLoggedIn} />
      <Routes>
        <Route path="/login" Component={Login} />
        <Route
          path="/tournamentList"
          element={
            <TournamentList
              loggedIn={isLoggedIn}
              setSelectedTournament={setSelectedTournament}
            />
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
