const { hashPassword, comparePassword } = require("../helper/authHelper");
const userModel = require("../models/userModel");
const orderModel = require("../models/orderModel")
const JWT = require("jsonwebtoken");

// POST Register
const registerController = async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;
    
    // Validation
    if (!name) {
      return res.status(400).send({ message: 'Name is required' });
    }
    if (!email) {
      return res.status(400).send({ message: 'Email is required' });
    }
    if (!password || password.length < 6) {
      return res.status(400).send({
        message: 'Password is required and should be at least 6 characters long',
      });
    }
    if (!phone) {
      return res.status(400).send({ message: 'Phone number is required' });
    }
    
    // Checking if user exists
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).send({
        success: false,
        message: 'User already registered, please login',
      });
    }

    // Hashing password
    const hashedPassword = await hashPassword(password);

    // Save user to database
    const user = await new userModel({
      name,
      email,
      phone,
      password: hashedPassword,
    }).save();

    res.status(201).send({
      success: true,
      message: 'User registered successfully',
      user: {
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role, // If role is needed
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: 'Error in registration',
      error: error.message,
    });
  }
};

// POST Login
const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).send({
        success: false,
        message: 'Email and password are required',
      });
    }

    // Check if user exists
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: 'User not found, please register first',
      });
    }

    // Check password
    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.status(400).send({
        success: false,
        message: 'Invalid password',
      });
    }

    // Generate JWT Token
    const token = JWT.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

    res.status(200).send({
      success: true,
      message: 'Logged in successfully',
      user: {
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: 'Error in login',
      error: error.message,
    });
  }
};



// Test Protected Route
const testController = (req, res) => {
  res.send("Protected route accessed");
};

//orders
const getOrdersController = async (req, res) => {
  try {
    const orders = await orderModel
      .find({ buyer: req.user._id })
      .populate("buyer", "name");
    res.json(orders);
  } catch (error) {
    console.log(error)
    res.status(500).send({
      success: false,
      message: 'Error While Geting Orders',
      error,
    });
  }
};


module.exports = { registerController, loginController, testController ,getOrdersController };
