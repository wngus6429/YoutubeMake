import mongoose from "mongoose";
import passportLogin from "passport-local-mongoose";

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  avatarUrl: String,
  facebookId: Number,
  githubId: Number
});

UserSchema.plugin(passportLogin, { usernameField: "email" });

const model = mongoose.Model("User", UserSchema);

export default model;
