const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    type_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "cartype",
      required: true,
    },
    datetime: { type: Date, required: true },

    //status =  pending,success,cancel
    status: { type: String, required: true, default: "pending" },

    lat_delivery: { type: String, default: null },
    long_delivery: { type: String, default: null },
    name_delivery: { type: String },
    detail_delivery: { type: String },
    tel_delivery: { type: String },

    lat_pickup: { type: String, default: null },
    long_pickup: { type: String, default: null },
    name_pickup: { type: String },
    detail_pickup: { type: String },
    tel_pickup: { type: String },
  },

  {
    timestamps: true,
  }
);

module.exports = mongoose.model("order", orderSchema);
