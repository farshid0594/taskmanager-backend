exports.ValidateSignUp = (req, res, next) => {
  var errors = [];
  var { username, password } = req.body;
  if (password.length < 6) {
    errors.push({
      key: "password",
      password: "password length must be more than 6",
    });
  }
  if (username.length < 6) {
    errors.push({
      key: "username",
      password: "username length must be more than 6",
    });
  }

  if (errors.length > 0) {
    return res.status(400).json({ errors: errors });
  }
  next();
};
