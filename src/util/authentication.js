import Cookies from "js-cookie";
import axios from "axios";

export async function isTokenExpired() {
  if (!Cookies.get("access_token")) {
    console.log("No access token");
    return true;
  }
  const expiresInSeconds = Cookies.get("expires_in");
  const startTimeInSeconds = Cookies.get("current_time");
  const currentTimeInSeconds = new Date().getTime() / 1000;
  if (currentTimeInSeconds === startTimeInSeconds + expiresInSeconds) {
    console.log("Token has now expired");
    return true;
  }
  return false;
}

export async function getAccessToken() {
  const scopes = "user.identity tournament.manager tournament.reporter";
  const CLIENT_SECRET = process.env.REACT_APP_CLIENT_SECRET;
  const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
  const REDIRECT_URI = `${process.env.REACT_APP_BASE_URL}/login_redirect`;

  const REFRESH_TOKEN = Cookies.get("refresh_token");
  // not yet impl
  if (false) {
    console.log("Refresh token exists, using to get new access token");
    const data = {
      grant_type: "refresh_token",
      refresh_token: REFRESH_TOKEN,
      scope: scopes,
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      redirect_uri: REDIRECT_URI,
    };
    await axios
      .post("https://api.start.gg/oauth/refresh", data, {
        "Content-Type": "application/json",
      })
      .then((r) => console.log(r));
  } else {
    console.log("No refresh token, redirecting to get new token");
    window.location.href = `http://start.gg/oauth/authorize?response_type=code&client_id=${CLIENT_ID}&scope=${scopes}&redirect_uri=${REDIRECT_URI}&client_secret=${CLIENT_SECRET}`;
  }
}
