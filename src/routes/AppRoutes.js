//import modules
const express = require("express");

//create router
const AppRouter = express.Router();

//routes
AppRouter.get("/", (req, res) => {
  res.send("app");
});

module.exports = AppRouter;
