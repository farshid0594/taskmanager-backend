//import modules
const { createServer } = require("http");
const express = require("express");

//create server
const app = express();
const httpServer = createServer(app);

//config routes
const Router = require("./src/routes");
app.use(Router);

httpServer.listen(8000, () => {
  console.log("server running");
});
