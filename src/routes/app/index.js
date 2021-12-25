//import modules
const express = require("express");
const userAuth = require("../../middlewares/userAuth");

//create router
const AppRouter = express.Router();


//import validator
const LoginValidator = require("../../validations/loginValidate");

//import controller
const UserController = require("../../controllers/app/userController");

//routes
AppRouter.post("/signup", LoginValidator.ValidateMobile, UserController.SignUp);

module.exports = AppRouter;
