import User from "../models/user.model";

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
  const user = await User.insertMany({ name, email, password });
  return res.status(200).json(user);
};

const updateUser = async (req, res) => {
  const { id } = req.params;
  const { email } = req.body;
  //   const user = await User.find({ id }).exec();
  //   if (!user) {
  //     return res.status(404).json({ message: "User not found." });
  //   }
  try {
    const user = await User.findByIdAndUpdate({ id }, { email: email }).exec();
    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found and update failed." });
    }
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    await User.findOneAndDelete({ id }).exec();
    return res.status(204).json({ message: "User deleted" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
export { getUserList, addNewUser, updateUser, deleteUser };
