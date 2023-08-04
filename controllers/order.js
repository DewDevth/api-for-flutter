const Order = require("../model/Order");

const CreateOrder = async (req, res) => {
  try {
    const orderData = req.body;
    // console.log("data : ", orderData);
    // Create the order
    const data = await Order.create(orderData);
    return res.status(201).json({ data });
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Error creating order and delivery point" });
  }
};

// Get all orders
const getAllOrder = async (req, res) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch orders." });
  }
};

module.exports = {
  CreateOrder,
  getAllOrder,
};
