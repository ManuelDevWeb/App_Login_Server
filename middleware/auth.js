import jwt from "jsonwebtoken";
import ENV from "../config.js";

// Middleware for verify authentication
const Auth = async (req, res, next) => {
  try {
    // Access authorize header to validate request
    const token = req.headers.authorization.split(" ")[1];

    // Retrive the user details to the logged in user
    const decodedToken = await jwt.verify(token, ENV.JWT_SECRET);

    // Save the user details to the request
    req.user = decodedToken;

    next();
  } catch (error) {
    res.status(401).json({ message: "Authentication Error" });
  }
};

// Middleware to set local variables
const localVariables = (req, res, next) => {
  req.app.locals = {
    OTP: null,
    resetSession: false,
  };

  next();
};

export { Auth, localVariables };
