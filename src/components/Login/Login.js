import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import start_gg_logo from "../../media/startgg-logo.png";
import { getAccessToken, isTokenExpired } from "../../util/authentication";
import { getCurrentUserId } from "../../util/queries";

const Login = () => {
  const navigate = useNavigate();
  const [isLoggedin, setIsLoggedin] = useState(false);

  const attemptLogin = () => {
    getAccessToken();
  };

  const handleLogin = async () => {
    const ACCESS_TOKEN_REGEX = /access_token=([^&]+)/;
    const REFRESH_TOKEN_REGEX = /refresh_token=([^&]+)/;
    const EXPIRES_IN_REGEX = /expires_in=([^&]+)/;
    const accessToken = window.location.href.match(ACCESS_TOKEN_REGEX);
    const refreshToken = window.location.href.match(REFRESH_TOKEN_REGEX);
    const expiresIn = window.location.href.match(EXPIRES_IN_REGEX);
    if (refreshToken) {
      Cookies.set("refresh_token", refreshToken[1]);
    }
    if (expiresIn) {
      Cookies.set("expires_in", expiresIn[1]);
      Cookies.set("current_time", new Date().getTime() / 1000); // current time in seconds
    }
    if (accessToken) {
      Cookies.set("access_token", accessToken[1]);
      await getCurrentUserId().then((userId) => {
        if (userId) {
          Cookies.set("user_id", userId);
          setIsLoggedin(true);
        }
      });
    }
  };

  useEffect(() => {
    if (isLoggedin) {
      setTimeout(() => {
        navigate("/streamQueue");
      }, 4 * 1000);
    }
    isTokenExpired().then((isExpired) => {
      if (!isExpired) {
        setIsLoggedin(true);
        setTimeout(() => {
          navigate("/streamQueue");
        }, 4 * 1000);
      }
    });
    handleLogin();
  });

  return !isLoggedin ? (
    <div className="flex justify-center mt-[20%]">
      <button
        className="flex justify-around items-center mb-4 p-4 text-mpsecondary border border-mpprimary bg-mpprimary rounded-lg py-2.5 text-center text-3xl w-2/5"
        onClick={attemptLogin}
      >
        <img width={80} src={start_gg_logo} alt="Start GG logo"></img>
        Log in with Start GG
      </button>
    </div>
  ) : (
    <h1 className="text-center text-6xl mt-[40vh]">User logged in</h1>
  );
};

export default Login;
