//import modules
const express = require("express");

//import routers
const AppRouter = require("./app");
const AdminRouter = require("./admin");
const UserRouter = require("./user");

//create router
const Router = express.Router();

//routes
Router.use("/app", AppRouter);
Router.use("/user", UserRouter);
Router.use("/admin", AdminRouter);

module.exports = Router;
