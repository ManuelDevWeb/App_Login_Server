import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please provide unique Username"],
    unique: [true, "Username already exists"],
  },
  password: {
    type: String,
    required: [true, "Please provide Password"],
    unique: false,
  },
  email: {
    type: String,
    required: [true, "Please provide Email"],
    unique: [true, "Email already exists"],
  },
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  mobile: {
    type: Number,
  },
  address: {
    type: String,
  },
  profile: {
    type: String,
  },
});

// If UserSchema is already registered, use that. Else, create new.
export default mongoose.models.User || mongoose.model("User", UserSchema);
