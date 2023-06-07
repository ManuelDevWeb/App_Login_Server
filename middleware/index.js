import UserModel from "../model/User.model.js";

// Middleware for verify user
const verifyUser = async (req, res, next) => {
  try {
    const { username } = req.method == "GET" ? req.query : req.body;

    // Check if username exists
    let exist = await UserModel.findOne({ username });

    if (!exist) {
      return res.status(404).json({ message: "User doesn't exist" });
    }

    next();
  } catch (error) {
    return res.status(404).json({ message: "Authentication Error" });
  }
};

export { verifyUser };
