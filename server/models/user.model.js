import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";

const UserSchema = new Schema({
  name: {
    type: String,
    trim: true,
    required: "Name is required",
  },
  email: {
    type: String,
    trim: true,
    unique: "Email already exists",
    match: [/.+\@.+\..+/, "Please fill a valid email address"],
    required: "Email is required",
  },
  created: {
    type: Date,
    default: Date.now,
  },
  updated: Date,
  password: {
    type: String,
    required: "Password is required",
  },
});

// Encryption and authentication
UserSchema.methods = {
  authenticate: function (password) {
    return bcrypt.compare(password, this.password);
  },

  encryptPassword: async function () {
    this.password = await bcrypt.hash(this.password, 12);
  },
};

const User = model("User", UserSchema);

export default User;
