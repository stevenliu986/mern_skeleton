import User from "../models/user.model";
import jwt from "jsonwebtoken";
import config from "../../config/config";
import expressjwt from "express-jwt";

const signIn = async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email }).exec();
    if (!existingUser) {
      return res.status(401).json({ error: "Invalid email or password!" });
    }
    const isPasswordValid = await existingUser.authenticate(password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid email or password!" });
    }
    // 通常情况下要在这里向前端发个token
    const accessToken = jwt.sign({ _id: existingUser._id }, config.jwtSecret);
    res.cookie("t", accessToken, { expiresIn: "30s" });
    return res.status(200).json({
      accessToken,
      user: { name: existingUser.name, email: existingUser.email },
    });
  } catch (error) {
    return res.status(401).json({ error: "Email and password don't match." });
  }
};

const signOut = async (req, res) => {
  res.clearCookies("t");
  return res.status(200).json({ message: "Sign out successfully!" });
};

const requireSignIn = expressjwt({
  secret: config.jwtSecret,
  userProperty: "auth",
});

const hasAuthorization = async (req, res, next) => {
  const authorized = req.profile && req.auth && req.profile._id == req.auth._id;
  if (!authorized) {
    return res.status(403).json({ message: "User not authorized" });
  }
  next();
};

export { signIn, signOut };
