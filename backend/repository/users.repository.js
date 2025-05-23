const User = require("../models/users.model");

exports.createUser = async (name, password, username) => {
  const user = new User({
    name,
    password,
    username,
  });
  await user.save();
};

exports.findUserByUsername = async (username) => {
  const user = await User.findOne({ username });
  return user;
};

exports.updatePassword = async (username, password) => {
  const user = await User.findOne({ username})
  if (!user) {
    throw new Error("User not found");
  }
  user.password = password;
  user.save();
};

exports.deleteUser = async (username) => {
  const user = await User.findOne({ username });
  if (!user) {
    throw new Error("User not found");
  }
  await user.deleteOne();
  return {
    username,
  };
};
