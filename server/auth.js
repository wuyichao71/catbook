require("dotenv").config();
const User = require("./models/user");
const { OAuth2Client } = require("google-auth-library");
const CLIENT_ID = process.env.CLIENT_ID;

const client = new OAuth2Client(CLIENT_ID);

const verify = (token) => {
  return client
    .verifyIdToken({ idToken: token, audience: CLIENT_ID })
    .then((ticket) => ticket.getPayload());
};

const getOrCreateUser = (user) => {
  return User.findOne({ googleid: user.sub }).then((existingUser) => {
    if (existingUser) return existingUser;

    const newUser = new User({ name: user.name, googleid: user.sub });

    return newUser.save();
  });
};

const login = (req, res) => {
  verify(req.body.token)
    .then((user) => getOrCreateUser(user))
    .then((user) => {
      console.log(`Logged in as ${user.name}`);

      req.session.user = user;
      res.send(user);
      console.log(req);
    })
    .catch((err) => {
      console.log(`Failed to log in: ${err}`);
      res.status(401).send({ err });
    });
};

const logout = (req, res) => {};

module.exports = {
  login,
  logout,
};
