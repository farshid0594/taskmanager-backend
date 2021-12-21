//import modules
const express = require("express");

//create router
const AdminRouter = express.Router();

//routes
AdminRouter.get("/", (req, res) => {
  res.send("Admin");
});

module.exports = AdminRouter;
