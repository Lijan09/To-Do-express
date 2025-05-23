const generateToken = require("../utils/auth/token");
const User = require("../models/users.model");
const catchAsync = require("../utils/catchAsync");

exports.register = async (req, res) => {
  const { name, password, username } = req.body;
  const user = await User.create({
    name,
    password,
    username,
  });
  const token = generateToken(user.username);
  res.status(201).json({
    status: "success",
    token,
    data: {
      user: {
        name: user.name,
        username: user.username,
      },
    },
  });
};
