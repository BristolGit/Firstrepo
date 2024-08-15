import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  username: String,
  email: String,
  first_name: String,
  last_name: String,
  password: String
});

const User = mongoose.model("User", UserSchema);

export default User