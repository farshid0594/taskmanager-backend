const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    username: { type: String, unique: true, index: true },
    password: { type: String },
    mobile: { type: String, required: true, unique: true, index:true },
    name: { type: String, maxlength: 30 },
    tokens: [{ text: String, expired: String }],
    code: { text: String, expired: String },
    isActive: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", UserSchema);
module.exports = User;
