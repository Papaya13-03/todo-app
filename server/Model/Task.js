const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  text: { type: String, required: true },
  done: { type: Boolean, defalut: false },
  ownerId: { type: String, require: true },
});

const Task = mongoose.model("task", taskSchema);

module.exports = Task;
