//import modules
const express = require("express");

//create router
const UserRouter = express.Router();

//routes
UserRouter.get("/", (req, res) => {
  res.send("User");
});

module.exports = UserRouter;
