require("dotenv").config();
const express = require("express");
const path = require("path");
const router = require("./api");
const mongoose = require("mongoose");
const { MongoClient, ServerApiVersion } = require("mongodb");
const cors = require("cors");

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

  // const client = new MongoClient(mongoConnectionURL, { dbName: databaseName });
  // try {
  //   await client
  //     .connect()
  //     .then(() => {
  //       console.log(`Connected to MongoDB database: ${databaseName}`);
  //     })
  //     .catch((err) => {
  //       console.error(`Error connecting to MongoDB: ${err}`);
  //     });

  //   await client.db("admin").command({ ping: 1 });
  //   console.log("Pinged your deployment. You successfully connected to MongoDB (mongodb)!");
  // } finally {
  //   await client.close();
  // }
}

run().catch(console.dir);

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api", router);

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

const port = 3000;
app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
