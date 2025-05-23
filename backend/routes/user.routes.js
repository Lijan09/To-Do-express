const express = require("express");
const router = express.Router();
const {preotect} = require("../middleware/auth.middleware");

router.get('/profile', protect, userController.getProfile);
