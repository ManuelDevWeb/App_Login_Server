import { Router } from "express";

// Controllers
import {
  register,
  login,
  getUser,
  updateUser,
  generateOTP,
  verifyOTP,
  createResetSession,
  resetPassword,
} from "../controllers/appController.js";

// Middlewares
import { verifyUser } from "../middleware/index.js";
import { Auth, localVariables } from "../middleware/auth.js";

const router = Router();

/** POST Methods */

// Register User
router.post("/register", register);

// Send Mail
// router.post("/register-mail", (req, res) => {
//   res.json({ message: "Register Mail" });
// });

// Authenticate User
router.post("/authenticate", (req, res) => {
  res.end();
});

// Login in App
router.post("/login", verifyUser, login);

/** GET Methods */

// User with username
router.get("/user/:username", getUser);

// Generate random OTP
router.get("/generateOTP", verifyUser, localVariables, generateOTP);

// Verify generated OTP
router.get("/verifyOTP", verifyOTP);

// Reset all the variables
router.get("/create-reset-session", createResetSession);

/** PUT Methods */

// Update user profile
router.put("/update-user", Auth, updateUser);

// Reset Password
router.put("/reset-password", resetPassword);

export default router;
