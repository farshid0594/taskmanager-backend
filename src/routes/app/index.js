//import modules
const express = require("express");

//create router
const AppRouter = express.Router();

//import validator
const LoginValidator = require("../../validations/loginValidate");

//import controller
const UserController = require("../../controllers/app/userController");

//routes
AppRouter.post("/signup", LoginValidator.ValidateMobile, UserController.SignUp);
AppRouter.post("/checkCode", UserController.CheckCode);
AppRouter.post("/completeSignup", LoginValidator.ValidateSignupFields, UserController.completeSignup);
AppRouter.post("/checkUserName", LoginValidator.ValidateUserName, UserController.checkUserName);

module.exports = AppRouter;
