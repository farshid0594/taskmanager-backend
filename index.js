//import modules
const { createServer } = require("http");
const express = require("express");

//create server
const app = express();
const httpServer = createServer(app);

app.get("/", (req, res) => {
  res.send("ok");
});

httpServer.listen(8000, () => {
  console.log("server running");
});
