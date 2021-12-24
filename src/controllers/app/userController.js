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
      if (findedUser === null) {
        // generate Code
        const generatedCode = utils.generateCode();

        // save new user
        var newUser = new User({
          mobile: mobile,
          code: {
            text: generatedCode,
            expired: moment().add(2, "minute").format("YYYYMMDDThhmmss"),
          },
        });
        newUser.save((err, savedNewUser) => {
          if (err) {
            return res.status(500).json({ message: "Server Error" });
          }
          return res.status(200).json({
            message: "successfully saved",
            id: savedNewUser._id,
          });
        });
      } else {
        if (findedUser.isActive === true) {
          return res
            .status(400)
            .json({ message: "user is already active in another phone" });
        }
        var updatedUser = findedUser;
        const generatedCode = utils.generateCode();
        updatedUser.code = {
          text: generatedCode,
          expired: moment().add(2, "minute").format("YYYYMMDDThhmmss"),
        };
        updatedUser.save((err, savedNewUser) => {
          if (err) {
            return res.status(500).json({ message: "Server Error" });
          }
          return res.status(200).json({
            message: "successfully updated",
            id: savedNewUser._id,
          });
        });
      }
    });
  } catch (e) {
    return res.status(500).json({ message: "server error" });
  }
};