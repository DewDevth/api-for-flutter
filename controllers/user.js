const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../model/user");

//Register
const Register = async (req, res) => {
  //register logic

  try {
    //Get user input
    const { name, email, password } = req.body;

    //validate user input
    if (!(email && password && name)) {
      res.status(400).send("All input is required");
    }

    //check if user already exist
    //validate if user exist in our database
    const oldUser = await User.findOne({ email });
    if (oldUser) {
      return res.status(409).send("User already exist. Please login");
    }

    //Encrypt user password
    encyptedPassword = await bcrypt.hash(password, 10);
    //create user in our database
    const user = await User.create({
      name,
      email: email.toLowerCase(),
      password: encyptedPassword,
      role: "user",
    });

    //create token
    const token = jwt.sign(
      { user_id: user._id, email },
      process.env.TOKEN_KEY,
      {
        expiresIn: "2h",
      }
    );

    //save user token
    user.token = token;

    //return new user
    // res.status(201).json(user);
    res.status(201).json({ message: "Register Successfully" });
  } catch (error) {
    console.log(error);
  }
};

//login
const Login = async (req, res) => {
  //login logic
  try {
    //get user input
    const { email, password } = req.body;
    // console.log(req.body)
    //validate user input
    if (!(email && password)) {
      res.status(400).json("All input is required");
    }

    //Validate if user exist in our database
    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      //Create token
      const token = jwt.sign(
        {
          user_id: user._id,
        },
        process.env.TOKEN_KEY,
        {
          expiresIn: "2h",
        }
      );
      //save user token

      user.token = token;
      // newUser to send json
      let newUser = {
        _id: user._id,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        token: user.token,
        role: user.role,
      };

      res.status(200).json(newUser);
    } else {
      res.status(400).json("Invalid Credentials");
    }
  } catch (error) {
    console.log(error);
  }
};

const Welcome = (req, res) => {
  res.status(200).send("Welcome");
};

const GetUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    console.error("Error while fetching users:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const UpdateUserById = async (req, res) => {
  try {
    const userId = req.params.id;
    const updateData = req.body;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    user.set(updateData);
    await user.save();

    res.status(200).json({ message: "User updated successfully" });
  } catch (error) {
    console.error("Error while updating user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const DeleteUserById = async (req, res) => {
  try {
    const userId = req.params.id;

    if (!userId) {
      return res.status(404).json({ error: "Id not found" });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    await user.remove();

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error while deleting user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  Register,
  Login,
  Welcome,
  GetUsers,
  DeleteUserById,
  UpdateUserById,
};
