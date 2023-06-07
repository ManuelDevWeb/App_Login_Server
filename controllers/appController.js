import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import ENV from "../config.js";

// Models
import UserModel from "../model/User.model.js";

/**
 * POST: http://localhost:8080/api/v1/register
 * @param : {
 * "username": "admin",
 * "password": "admin123/*",
 * "email": "admin@gmail.com",
 * "firstName": "Admin",
 * "lastName": "Admin",
 * "mobile": "1234567890",
 * "address": "Admin Address",
 * "profile": "",
 * }
 */
const register = async (req, res) => {
  try {
    const { username, password, profile, email } = req.body;

    // Check if user already exists
    const existUsername = await UserModel.findOne({ username });

    if (existUsername) {
      return res.status(400).json({ message: "Username already exists" });
    }

    // Check if email already exists
    const existEmail = await UserModel.findOne({ email });

    if (existEmail) {
      return res.status(400).json({ message: "Email already exists" });
    }

    if (password && username && email) {
      // Hash password
      const salt = await bcrypt.genSalt(10);
      const passwordHashed = await bcrypt.hash(password, salt);

      // Create new user
      const user = await UserModel.create({
        username,
        password: passwordHashed,
        profile: profile || "",
        email,
      });

      const userSaved = await user.save();

      // Check if user is saved
      if (!userSaved) {
        return res.status(400).json({ message: "User not created" });
      }

      return res.status(201).json({
        message: "User created successfully",
        // Exclude password
        data: {
          username: user.username,
          email: user.email,
          profile: user.profile,
        },
      });
    }

    return res.status(400).json({ message: "Please provide all the fields" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

/**
 * POST: http://localhost:8080/api/v1/login
 * @param : {
 * "username": "admin",
 * "password": "admin123/*"
 * }
 */
const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Check if user exists
    const user = await UserModel.findOne({ username });

    // Verify password
    const passwordCorrect = await bcrypt.compare(password, user.password);

    if (!passwordCorrect) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Create JWT token
    const token = jwt.sign(
      { userId: user._id, username: user.username },
      ENV.JWT_SECRET,
      {
        expiresIn: "24h",
      }
    );

    return res.status(200).json({
      message: "User logged successfully",
      username: user.username,
      token,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

/**
 * GET: http://localhost:8080/api/v1/user/:username
 */
const getUser = async (req, res) => {
  res.json({ message: "Get User" });
};

/**
 * GET: http://localhost:8080/api/v1/update-user
 * @param : {
 * "id": "<userid>",
 * }
 * @body : {
 * "firstName": "Admin",
 * "lastName": "Admin",
 * "mobile": "1234567890",
 * "address": "Admin Address",
 * "profile": "",
 * }
 */
const updateUser = async (req, res) => {
  res.json({ message: "Update User" });
};

/**
 * GET: http://localhost:8080/api/v1/generateOTP
 */
const generateOTP = async (req, res) => {
  res.json({ message: "Generate OTP" });
};

/**
 * GET: http://localhost:8080/api/v1/verifyOTP
 */
const verifyOTP = async (req, res) => {
  res.json({ message: "Verify OTP" });
};

// Successfully redirect user when OTP is valid
/**
 * GET: http://localhost:8080/api/v1/create-reset-session
 */
const createResetSession = async (req, res) => {
  res.json({ message: "Create Reset Session" });
};

// Update password when we have valid session
/**
 * PUT: http://localhost:8080/api/v1/reset-password
 */
const resetPassword = async (req, res) => {
  res.json({ message: "Reset Password" });
};

export {
  register,
  login,
  getUser,
  updateUser,
  generateOTP,
  verifyOTP,
  createResetSession,
  resetPassword,
};
