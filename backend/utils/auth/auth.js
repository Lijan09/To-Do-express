const bcrypt = require("bcrypt");

exports.hashPassword = async (hashPassword) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(hashPassword, salt);
  return hashedPassword;
};

exports.validatePassword = async (password, hashedPassword) => {
  const isValid = await bcrypt.compare(password, hashedPassword);
  return isValid;
};
