const mongoose = require("mongoose");

const q_aSchema = new mongoose.Schema({
  nature: { type: String, required: true }, // default=multichoice/bool/etc..
  question: { type: String, required: true },
  options: {
    a: { type: String, required: true },
    b: { type: String, required: true },
    c: String,
    d: String,
  },
  answer: {
    // either 'a', 'b', 'c' or 'd'
    type: String,
    maxlength: 1,
    required: true,
  },
  correction: {
    type: String, //Why the correct answer is correct
    required: true,
  },
});

const todoSchema = new mongoose.Schema({
  format: String, // read/video/question
  notes: String,
  videos: [String],
  q_a: [q_aSchema],
  index: Number,
  taskId: { type: mongoose.Schema.Types.ObjectId, ref: "Task" },
});

module.exports = mongoose.model("Todo", todoSchema);
