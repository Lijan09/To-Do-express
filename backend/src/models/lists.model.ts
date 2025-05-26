const mongoose = require("mongoose");

const listSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  comments: {
    type: String,
    required: false,
  },
  status: {
    type: String,
    enum: ["active", "doing", "completed"],
    default: "active",
  },
  createdAt: {
    type: Date,
    default: Date.now,
    mutable: false,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const List = mongoose.model("List", listSchema);

module.exports = List;
