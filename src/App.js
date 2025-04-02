import "./App.css";
import Login from "./components/Login/Login";
import SetReporter from "./components/SetReporter/SetReporter";
import StreamQueue from "./components/StreamQueue/StreamQueue";
import TournamentList from "./components/TournamentList/TournamentList";

import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { navigateTo } from "./util/navigate";
import { markSetInProgress } from "./util/queries";

function App() {
  const navigate = useNavigate();
  const [selectedTournament, setSelectedTournament] = useState();
  const [selectedSet, setSelectedSet] = useState();

  useEffect(() => {
    if (selectedSet) {
      markSetInProgress(selectedSet.id);
    }
  }, [selectedSet]);

  useEffect(() => {
    // attempt at forcing fullscreen
    document.querySelector("body").requestFullscreen();
  }, []);

  const logout = () => {
    console.log("Logging out");
    Object.keys(Cookies.get()).forEach((cookie) => Cookies.remove(cookie));
    navigateTo(navigate, "/login");
  };

  return (
    <div className="App">
      <Routes>
        <Route path="/login" Component={Login} />
        <Route
          path="/tournamentList"
          element={<TournamentList setSelectedTournament={setSelectedTournament} logout={logout} />}
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
        <Route path="/setReporter" element={<SetReporter set={selectedSet} />} />
      </Routes>
    </div>
  );
}

export default App;
