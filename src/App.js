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
  const cookies = [
    "access_token",
    "current_time",
    "expires_in",
    "refresh_token",
    "tournament",
    "user_id",
  ];

  useEffect(() => {
    if (selectedSet) {
      markSetInProgress(selectedSet.id);
    }
  }, [selectedSet]);

  const logout = () => {
    console.log("Logging out");
    cookies.forEach((key) => Cookies.remove(key));
    navigateTo(navigate, "/login");
  };

  return (
    <div className="App">
      <button className="absolute bottom-7 right-10" onClick={logout}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
          strokeWidth={1.5}
          className="w-16"
          stroke="#fa0000"
        >
          <path
            fill="#fa0000"
            d="M502.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L402.7 224 192 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l210.7 0-73.4 73.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l128-128zM160 96c17.7 0 32-14.3 32-32s-14.3-32-32-32L96 32C43 32 0 75 0 128L0 384c0 53 43 96 96 96l64 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-64 0c-17.7 0-32-14.3-32-32l0-256c0-17.7 14.3-32 32-32l64 0z"
          />
        </svg>
      </button>
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
