const express = require("express");
const auth = require("../middleware/auth");
const {
  Register,
  Login,
  Welcome,
  GetUsers,
  UpdateUserById,
  DeleteUserById,
} = require("../controllers/user");
const { createCarType, getCarType } = require("../controllers/carType");
const { CreateOrder, getAllOrder } = require("../controllers/order");

const router = express.Router();

//auth
router.post("/register", Register);
router.post("/login", Login);
router.get("/welcome", auth, Welcome);
router.get("/users", auth, GetUsers);
router.put("/user/:id", auth, UpdateUserById);
router.delete("/user/:id", auth, DeleteUserById);

// car type
router.get("/car-type", getCarType);
router.post("/car-type", createCarType);

//order and delivery
router.post("/order-delivery", CreateOrder);
router.get("/order-delivery-all", getAllOrder);

module.exports = router;
