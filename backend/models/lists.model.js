const mongoose = require("mongoose");

const listSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["dormant", "active"],
    default: "dormant",
  },
  complete: {
    type: Boolean,
    default: false,
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

listSchema.pre("validate", function (next) {
  if (this.complete === true && this.status === "active") {
    return next(new Error('A completed task cannot have status "active".'));
  }
  next();
});

const List = mongoose.model("List", listSchema);

module.exports = List;
