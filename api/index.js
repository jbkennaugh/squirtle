const express = require("express");
const axios = require("axios");
const app = express();

const scopes =
  "user.identity,user.email,tournament.manager,tournament.reporter";
const CLIENT_SECRET = process.env.REACT_APP_CLIENT_SECRET;
const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
const REDIRECT_URI = "http://localhost:3000/login_redirect";

app.get("/login_redirect", function (req, res) {
  const {
    query: { code },
  } = req;
  if (!code) {
    console.log("no code");
    res.send({
      error: "OAuth login failed. Please restart flow. Error: missing code",
    });
    return;
  }
  const data = {
    client_id: CLIENT_ID,
    client_secret: CLIENT_SECRET,
    grant_type: "authorization_code",
    code: code,
    redirect_uri: REDIRECT_URI,
    scope: scopes,
  };
  const headers = {
    "Content-Type": "application/json",
  };
  axios
    .post("https://api.start.gg/oauth/access_token", data, {
      headers,
    })
    .then((body) => {
      const ACCESS_TOKEN = body.data.access_token;
      const REFRESH_TOKEN = body.data.refresh_token;
      const EXPIRES_IN = body.data.expires_in;
      res.redirect(
        `http://localhost:3000/login?access_token=${ACCESS_TOKEN}&refresh_token=${REFRESH_TOKEN}&expires_in=${EXPIRES_IN}`
      );
    })
    .catch((e) => {
      console.log(e);
      res.send("Error completing oauth login.");
    });
});

module.exports = app;
