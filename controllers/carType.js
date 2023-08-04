const CarType = require("../model/carType");

// Get all car types
const getCarType = async (req, res) => {
  try {
    const carTypes = await CarType.find();
    res.status(200).json(carTypes);
  } catch (error) {
    res.status(500).json({ error: "Unable to fetch car types" });
  }
};

// Create a new car type
const createCarType = async (req, res) => {
  try {
    const { title, image, detail, size, isActive } = req.body;
    const newCarType = new CarType({
      title,
      image,
      detail,
      size,
      isActive: isActive || true, // Use default value true if isActive is not provided
    });

    const savedCarType = await newCarType.save();
    res.status(201).json(savedCarType);
  } catch (error) {
    res.status(500).json({ error: "Unable to create car type" });
  }
};

module.exports = {
  getCarType,
  createCarType,
};
