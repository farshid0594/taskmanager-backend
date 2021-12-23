const User = require("../../models/user");
const bcrypt = require("bcrypt");
const utilities = require("../../helpers/utilities");
const moment = require("moment");

exports.SignUp = function (req, res) {
  try {
    // get req body
    var { username, password, mobile } = req.body;
    // check user exists
    User.findOne({ username: username }, (err, findedUser) => {
      if (err) {
        return res.status(500).json({ message: "server error" });
      }
      if (findedUser) {
        return res.status(400).json({ message: "User exists" });
      }

      // hash password
      bcrypt.hash(password, bcrypt.genSaltSync(10), (err, hash) => {
        if (err) {
          return res.status(500).json({ message: err });
        }

        // generate Code
        const generatedCode = utilities.generateCode();

        // save new user
        var newUser = new User({
          username: username,
          password: hash,
          mobile: mobile,
          code: {
            codeNo: generatedCode,
            expired: moment().add(2, "minute").format("YYYYMMDDThhmmss"),
          },
        });
        newUser.save((err, savedNewUser) => {
          if (err) {
            return res
              .status(500)
              .json({ message: "Server Error", err: err });
          }
          return res.status(200).json({
            message: "successfully saved",
            id: savedNewUser._id,
            code: generatedCode,
          });
        });
      });
    });
  } catch (e) {
    return res.status(500).json({ message: "server error" });
  }
};