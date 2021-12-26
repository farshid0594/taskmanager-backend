const moment = require("moment");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt")

const utils = require("../../helpers/utils");
const User = require("../../models/user");

exports.SignUp = function (req, res) {
  try {
    // get req body
    const { mobile } = req.body;
    // check user exists
    User.findOne({ mobile: mobile }, (err, findedUser) => {
      if (err) {
        return res.status(500).json({ message: "server error" });
      }
      if (findedUser && findedUser.isActive === true) {
        return res
          .status(400)
          .json({ message: "This mobile number has already been registered" });
      }
      let newUser;
      const generatedCode = utils.generateCode();
      const expiredTime = moment().add(2, "minute").format("YYYYMMDDThhmmss");
      if (findedUser === null) {
        //create new User
        newUser = new User({
          mobile: mobile,
          code: {
            text: generatedCode,
            expired: expiredTime,
          },
        });
      } else {
        //updated inActive user
        newUser = findedUser;
        newUser.code = {
          text: generatedCode,
          expired: expiredTime,
        };
      }
      newUser.save((err, savedUser) => {
        if (err) {
          return res.status(500).json({ message: "Server Error" });
        }
        return res.status(200).json({
          message: "successfully updated",
          id: savedUser._id,
        });
      });
    });
  } catch (e) {
    return res.status(500).json({ message: "server error" });
  }
};

exports.CheckCode = function (req, res) {
  const { code, id } = req.body;

  User.findById(id, (err, foundedUser) => {
    if (err) {
      return res.status(500).json({ message: "server error" });
    }
    if (foundedUser === null) {
      return res.status(404).json({ message: "user not found" });
    } else {
      if (
        moment().diff(
          moment(foundedUser.code.expired, "YYYYMMDDThhmmss"),
          "s"
        ) < 0
      ) {
        return res.status(400).json({
          message: "user code has expired",
        });
      }
      if (foundedUser.code.text === code) {
        const operationId = jwt.sign(
          { userId: foundedUser._id, code: code },
          process.env.JWT_SECRET_KEY,
          {
            expiresIn: "2h",
          }
        );
        return res
          .status(200)
          .json({ message: "succecfully confirmed", operationId: operationId });
      } else {
        return res.status(400).json({ message: "wrong code" });
      }
    }
  });
};

exports.completeSignup = function (req, res) {
  const { operationId, userName, password } = req.body;
  const { userId, code } = jwt.verify(operationId, process.env.JWT_SECRET_KEY);
  try {
    User.findById(userId, (err, foundedUser) => {
      if (err) {
        return res.status(500).json({ message: "server error" });
      }
      if (foundedUser === null) {
        return res.status(404).json({ message: "user not found" });
      } else {
        if (foundedUser.code.text !== code) {
          return res.status(400).json({ message: "wrong enteries" });
        }
        if (foundedUser.isActive) {
          return res.status(400).json({ message: "user is already active" });
        }
        
      // hash password
      bcrypt.hash(password, bcrypt.genSaltSync(10), (err, hash) => {
        if (err) {
          return res.status(500).json({ message: "server error" });
        }
        //updated inActive user
        foundedUser.userName = userName;
        foundedUser.password = hash;
        foundedUser.isActive = true;
        foundedUser.save((err, savedUpdatedUser) => {
          if (err) {
            return res.status(500).json({ message: "Server Error" });
          }
          return res.status(200).json({
            message: "signup completed"
          });
        });
      });
      }
    });
  } catch (error) {
    return res.status(500).json({ message: "server error" });
  }
};
