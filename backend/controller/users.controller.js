const generateToken = require("../utils/auth/token");
const catchAsync = require("../utils/catchAsync");
const {
  registerUser,
  loginUser,
  logoutUser,
  updatePassword,
  getProfile,
} = require("../service/users.service");
const { findUserByUsername } = require("../repository/users.repository");

exports.register = catchAsync(async (req, res) => {
  const { name, password, username } = req.body;
  const userData = registerUser(name, password, username);
  const token = generateToken(username);
  res.status(201).json({
    status: "success",
    token,
    data: { userData },
  });
});

exports.login = catchAsync(async (req, res) => {
  const { username, password } = req.body;
  const userData = loginUser(username, password);
  const token = generateToken(username);
  res.status(200).json({
    status: "success",
    token,
    data: { userData },
  });
});

exports.logout = catchAsync(async (req, res) => {
  logoutUser(res);
  res.status(200).json({
    status: "success",
    message: "User logged out successfully",
  });
});

exports.updatePassword = catchAsync(async (req, res) => {
  const { username, password } = req.body;
  const userData = updatePassword(username, password);
  res.status(200).json({
    status: "success",
    data: { userData },
  });
});

exports.getProfile = catchAsync(async (req, res) => {
  const { username } = req.user;
  const userData = getProfile(username);
  res.status(200).json({
    status: "success",
    data: { userData },
  });
});
