import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { isTokenExpired } from "../../util/authentication";
import { getCurrentUser } from "../../util/queries";

const Login = () => {
  const navigate = useNavigate();
  const [loggedInUser, setLoggedInUser] = useState<string | null>();

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
      Cookies.set("current_time", String(new Date().getTime() / 1000)); // current time in seconds
    }
    if (accessToken) {
      Cookies.set("access_token", accessToken[1]);
      await getCurrentUser().then((user) => {
        if (user) {
          Cookies.set("user_id", user.id);
          Cookies.set("user_name", user.name);
          setLoggedInUser(user.name);
        }
      });
    }
  };

  useEffect(() => {
    isTokenExpired().then((isExpired) => {
      if (isExpired) {
        setLoggedInUser(null);
      }
    });
    if (loggedInUser) {
      setTimeout(() => {
        navigate("/streamQueue");
      }, 4 * 1000);
    }
    handleLogin();
  });

  return loggedInUser ? (
    <h1 className="text-center text-6xl mt-[40vh]">{`${loggedInUser} logged in`}</h1>
  ) : (
    <h1 className="text-center text-6xl mt-[40vh]">Attempting login...</h1>
  );
};

export default Login;
