require("dotenv").config();
let runType = "development";
if (typeof process.argv[2] !== "undefined") {
  runType = process.argv[2];
}
require("dotenv").config({ path: `.env.${runType}` });
const User = require("./models/user");
const { OAuth2Client } = require("google-auth-library");
const CLIENT_ID = process.env.VITE_GOOGLE_CLIENT_ID;
const BASENAME = process.env.VITE_REDIRECT_BASE;

const client = new OAuth2Client(CLIENT_ID);
const github_client_id = process.env.VITE_GITHUB_CLIENT_ID;
const github_client_secret = process.env.VITE_GITHUB_CLIENT_SECRET;
const github_authorize_uri = "https://github.com/login/oauth/authorize";
const github_callback_uri = `${BASENAME}/api/auth/github/callback`;
const github_token_uri = "https://github.com/login/oauth/access_token";
const github_user_uri = "https://api.github.com/user";
const github_base = process.env.VITE_BASE;
const outdir = process.env.VITE_OUTDIR;
console.log(github_client_id);
console.log(github_client_secret);
console.log(github_callback_uri);

const verify = async (token) => {
  return client
    .verifyIdToken({ idToken: token, audience: CLIENT_ID })
    .then((ticket) => ticket.getPayload());
};

const getOrCreateUser = async (user) => {
  return User.findOne({ uid: user.uid }).then((existingUser) => {
    if (existingUser) return existingUser;

    const newUser = new User(user);

    return newUser.save();
  });
};

const login = (req, res) => {
  // console.log(req.user);
  verify(req.body.token)
    .then((user) => {
      return { uid: user.sub, name: user.name, from: "google" };
    })
    .then(getOrCreateUser)
    .then((user) => {
      console.log(`Logged in as ${user.name}`);

      req.session.user = user;
      res.send(user);
      // console.log(req.session);
    })
    .catch((err) => {
      console.log(`Failed to log in: ${err}`);
      res.status(401).send({ err });
    });
};

const logout = (req, res) => {
  if (req.user && req.user.name) {
    console.log(`Logged out as ${req.user.name}`);
  } else {
    console.log("Logged out as undefined");
  }

  // console.log(`${req.user.name}`);
  req.session.user = null;
  res.send({});
  // console.log(`${req.user.name}`);
  // res.send({ name: req.user.name });
};

const githubLogin = (req, res) => {
  console.log(req.hostname);
  const uri = `${github_authorize_uri}?client_id=${github_client_id}&redirect_uri=${github_callback_uri}`;
  res.redirect(uri);
};

const githubCallback = (req, res) => {
  const code = req.query.code;
  // console.log(code);
  // res.send({ code: code });
  fetch(github_token_uri, {
    method: "POST",
    credentials: "include",
    headers: { "Content-type": "application/json", Accept: "application/json" },
    body: JSON.stringify({
      client_id: github_client_id,
      client_secret: github_client_secret,
      code: code,
    }),
  })
    .then((res) => res.json())
    .then((res) => {
      return fetch(github_user_uri, {
        method: "GET",
        headers: { Authorization: `${res.token_type} ${res.access_token}` },
      });
    })
    .then((res) => res.json())
    // .then((res) => {
    //   console.log(res);
    //   return res;
    // })
    .then((user) => {
      return { uid: user.id, name: user.name, from: "github" };
    })
    .then(getOrCreateUser)
    .then((user) => {
      console.log(`Logged in as ${user.name}`);

      req.session.user = user;
      const uri = `${github_base}/github/callback?userId=${user._id}`;
      res.redirect(uri);
      // res.redirect("http://localhost:3001/catbook/");
    })
    .catch((err) => {
      console.log(`Failed to log in: ${err}`);
      res.status(401).send({ err });
    });
};

const populateCurrentUser = (req, res, next) => {
  req.user = req.session.user;
  next();
};

module.exports = {
  login,
  githubLogin,
  githubCallback,
  logout,
  populateCurrentUser,
  outdir,
};
