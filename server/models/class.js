const mongoose = require("mongoose");

const classSchema = new mongoose.Schema({
  name: { type: String, required: true },
  teacher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  startTime: { type: Date, default: Date.now },
  endTime: { type: Date, default: Date.now },
  active: { type: Boolean, default: true },
});

module.exports = mongoose.model("Class", classSchema);
