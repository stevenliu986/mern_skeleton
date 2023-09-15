import User from "../models/user.model";
import jwt from "jsonwebtoken";
import config from "../../config/config";

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
export { signIn };
