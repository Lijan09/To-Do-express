const passwordHash = require("../utils/auth/auth");
const {
  createUser,
  findUserByUsername,
  updatePassword,
} = require("../repository/users.repository");

exports.registerUser = async (name, password, username) => {
  const hashedPassword = await passwordHash.hashPassword(password);
  createUser(name, hashedPassword, username);
  return {
    name,
    username,
  };
};

exports.loginUser = async (username, password) => {
  const user = await findUserByUsername(username);
  if (!user) {
    throw new Error("User not found");
  }
  const isValid = await passwordHash.validatePassword(password, user.password);
  if (!isValid) {
    throw new Error("Invalid password");
  }
};

exports.logoutUser = async (response) => {
  response.clearCookie("token");
};

exports.updatePassword = async (username, password) => {
  updatePassword(username, password);
  return {
    username,
    message: "Password updated successfully",
  };
};

exports.getProfile = async (username) => {
  const user = await findUserByUsername(username);
  if (!user) {
    throw new Error("User not found");
  }
  return {
    name: user.name,
    username: user.username,
  };
}
