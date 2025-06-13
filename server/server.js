const express = require("express");
const path = require("path");

const app = express();

app.get("/api/test", (req, res) => {
  res.send({ message: "Example API endpoint" });
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
