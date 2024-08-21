import Cookies from "js-cookie";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { navigateTo } from "../../util/navigate";

const TournamentList = () => {
  const navigate = useNavigate();
  const [showSidebar, setShowSidebar] = useState(false);

  const logout = () => {
    console.log("Logging out");
    Object.keys(Cookies.get()).forEach((cookie) => Cookies.remove(cookie));
    navigateTo(navigate, "/login");
  };

  return (
    <>
      <button
        className="absolute top-7 left-10 cursor-pointer"
        onClick={() => setShowSidebar(true)}
      >
        <svg fill="#2563EB" viewBox="0 0 100 80" width="40" height="40">
          <rect width="100" height="10"></rect>
          <rect y="30" width="100" height="10"></rect>
          <rect y="60" width="100" height="10"></rect>
        </svg>
      </button>
      {showSidebar && (
        <div className="fixed top-0 bottom-0 left-0 z-50 flex flex-col w-1/4 my-2 h-95% bg-mpprimary border-r-8 border-y-8 rounded-md border-mpprimarydark">
          <button className="absolute bottom-7 left-2/3" onClick={logout}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              strokeWidth={1.5}
              className="w-12"
              stroke="#fa0000"
            >
              <path
                fill="#fa0000"
                d="M502.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L402.7 224 192 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l210.7 0-73.4 73.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l128-128zM160 96c17.7 0 32-14.3 32-32s-14.3-32-32-32L96 32C43 32 0 75 0 128L0 384c0 53 43 96 96 96l64 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-64 0c-17.7 0-32-14.3-32-32l0-256c0-17.7 14.3-32 32-32l64 0z"
              />
            </svg>
          </button>
        </div>
      )}
    </>
  );
};

export default TournamentList;
