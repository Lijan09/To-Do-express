const jwt = require("jsonwebtoken");

const generateToken = (user) => {
  const token = jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: JWT_EXPRIRATION,
  });
  return token;
};

module.exports = generateToken;
