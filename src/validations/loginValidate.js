const User = require("../models/user")

exports.ValidateMobile = (req, res, next) => {
  const { mobile } = req.body;
  if (!/^09[0-9]{9}$/.test(mobile)) {
    return res
      .status(400)
      .json({ errors: "phone number format is not correct" });
  } else {
    next();
  }
};

exports.ValidateSignupFields = (req, res, next) => {
  const errors = [];
  const { userName, password } = req.body;
  if (password.length < 6) {
    errors.push({
      key: "password",
      password: "password length must be more than 6",
    });
  }
  if (userName.length < 4) {
    errors.push({
      key: "userName",
      userName: "userName length must be more than 6",
    });
  }

  if (errors.length > 0) {
    return res.status(400).json({ errors: errors });
  }
  User.findOne({ userName: userName }, (err, doc) => {
    if (err) {
      return res.status(500).json({ message: "server Error"});
    }
    if (doc !== null) {
      errors.push({
        key: "userName",
        password: "userName exists",
      });
      return res.status(400).json({ errors: errors });
    }
    next();
  });
};
