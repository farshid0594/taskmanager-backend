//import modules
const express = require("express");

//import routers
const AppRouter = require("./AppRoutes");
const AdminRouter = require("./AdminRoutes");
const UserRouter = require("./UserRouter");

//create router
const Router = express.Router();

//routes
Router.use("/app", AppRouter);
Router.use("/user", UserRouter);
Router.use("/admin", AdminRouter);

module.exports = Router;
