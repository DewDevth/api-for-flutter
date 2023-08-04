const mongoose = require("mongoose");

const carTypeSchema = new mongoose.Schema(
  {
    title: { type: String, reuired: true },
    image: { type: String, reuired: true },
    detail: { type: String, reuired: true },
    size: { type: String, reuired: true },
    isActive: { type: Boolean, reuired: true, default: true },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("cartype", carTypeSchema);
