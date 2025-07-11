require("dotenv").config();
const http = require("http");
const express = require("express");
const session = require("express-session");
// const cookieSession = require("cookie-session");
const path = require("path");

const mongoose = require("mongoose");
// const { MongoClient, ServerApiVersion } = require("mongodb");
const cors = require("cors");
// const { fileURLToPath } = require("url");

const api = require("./api.cjs");
const auth = require("./auth.cjs");

const socketManager = require("./server-socket.cjs");

const mongoConnectionURL = process.env.mongoURL;
const databaseName = process.env.databaseName;
// console.log(mongoConnectionURL);
// console.log(databaseName);

async function run() {
  try {
    await mongoose
      .connect(mongoConnectionURL, { dbName: databaseName })
      .then(() => console.log(`Connected to MongoDB database: ${databaseName}`))
      .catch((err) => console.log(`Error connecting to MongoDB: ${err}`));
    // await mongoose.connection.db.admin().command({ ping: 1 });
    // console.log("Pinged your deployment. You successfully connected to MongoDB (mongoose)!");
  } finally {
    // await mongoose.connection.close();
  }
}

run().catch(console.dir);

const app = express();

app.use(express.json());

const allowedOrigins = [
  "http://localhost:5174",
  "http://localhost:3001",
  "https://wuyichao71.github.io",
  "https://catbook-netlify.netlify.app",
  "https://catbook-api.onrender.com",
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

// app.use(cors());

app.use(
  session({
    secret: "session-secret",
    resave: false,
    saveUninitialized: false,
    // cookie: {
    //   sameSite: "none",
    // },
  })
);

// app.use(
//   cookieSession({
//     name: "catbook_session",
//     keys: ["session-secret"],
//     maxAge: 24 * 60 * 60 * 1000,
//   })
// );

app.use(auth.populateCurrentUser);

app.use("/api", api);

const reactPath = path.resolve(__dirname, "..", "client", auth.outdir);

app.use(express.static(reactPath));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(reactPath, "index.html"));
});

// app.use(express.static(path.resolve(__dirname, "..", "client", "dist")));

// app.get("/", (req, res) => {
//   res.sendFile(path.resolve(__dirname, "..", "client", "dist", "index.html"));
// });

app.all("*", (req, res) => {
  console.log(`Route not found: ${req.method} ${req.url}`);
  res.status(404).send({ msg: "Route not found" });
});

// any server errors cause this function to run
app.use((err, req, res, next) => {
  const status = err.status || 500;
  if (status === 500) {
    // 500 means Internal Server Error
    console.log("The server errored when processing a request");
    console.log(err);
  }

  res.status(status);
  res.send({
    status: status,
    message: err.message,
  });
});

const port = process.env.PORT || 3000;
const server = http.Server(app);
socketManager.init(server);
server.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
