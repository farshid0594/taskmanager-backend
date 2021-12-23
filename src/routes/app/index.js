//import modules
const express = require("express");

//create router
const AppRouter = express.Router();

//import validator
const LoginValidator = require("../../validations/loginValidate");


//import controller
const UserController = require("../../controllers/app/userController");


//routes
AppRouter.get("/", (req, res) => {
  res.send("app");
});

AppRouter.post("/signup", LoginValidator.ValidateSignUp, UserController.SignUp);

module.exports = AppRouter;
