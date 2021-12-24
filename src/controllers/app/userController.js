const moment = require("moment");

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
  var { code, id } = req.body;

  User.findById(id)
    .populate("code")
    .exec((err, foundedUser) => {
      if (err) {
        return res.status(500).json({ message: "server error" });
      }
      if (foundedUser === null) {
        return res.status(404).json({ message: "user not found" });
      }
      if (foundedUser.code && foundedUser.code === code) {
        return res.status(200).json({ message: "succecfully confirmed" });
      } else {
        return res.status(400).json({ message: "wrong code" });
      }
    });
};
