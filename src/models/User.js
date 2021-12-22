
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema(
    {
        username: { type: String, required: true },
        password: { type: String, required: true },
        mobile: { type: String, required: true },
        name: String,
        tokens: [{ text: String, expired: String }],
        code: { codeNo: Number, expired: String },
        isActive: { type: Boolean, default: false },
    },
    {
        timestamps: true,
    }
);

const User = mongoose.model("User", UserSchema);
module.exports = User;
