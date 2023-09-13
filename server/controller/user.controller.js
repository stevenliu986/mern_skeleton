import User from "../models/user.model";
import bcrypt from "bcrypt";

const getUserList = async (req, res) => {
  try {
    const users = await User.find().exec();
    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const addNewUser = async (req, res) => {
  const { name, email, password } = req.body;
  const user = new User({ name, email, password });
  await user.encryptPassword();
  await user.save();
  return res.status(200).json(user);
};

const signIn = async (req, res) => {
  const { email, password } = req.body;
  const existingUser = await User.findOne({ email }).exec();
  if (!existingUser) {
    return res.status(401).json({ error: "Invalid email or password!" });
  }
  const isPasswordValid = await existingUser.authenticate(password);
  if (!isPasswordValid) {
    return res.status(401).json({ error: "Invalid email or password!" });
  }
  // 通常情况下要在这里向前端发个token
  return res
    .status(200)
    .json({ name: existingUser.name, email: existingUser.email });
};

const updateUser = async (req, res) => {
  const { id } = req.params;
  const { email } = req.body;
  console.dir(User);
  const user = await User.findByIdAndUpdate(
    { _id: id },
    { email: email }
  ).exec();
  if (!user) {
    return res.status(400).json({ message: "User update failed." });
  }
  return res.status(200).json(user);
};

// const deleteUser = async (req, res) => {
//   const { id } = req.params;
//   try {
//     await User.findOneAndDelete({ id }).exec();
//     return res.status(204).json({ message: "User deleted" });
//   } catch (error) {
//     return res.status(500).json({ message: error.message });
//   }
// };

export { getUserList, addNewUser, signIn, updateUser };
