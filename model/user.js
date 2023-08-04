const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, reuired: true },
    email: { type: String, unique: true, reuired: true },
    password: { type: String, reuired: true },
    role: { type: String },
    token: { type: String },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("user", userSchema);
