const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
  format: String, // read/video/question
  notes: String || HTMLElement,
  video: String,
  q_a: {
    nature: { type: String, required: true }, // default=multichoice/bool/etc..
    question: { type: String, required: true },
    options: [String],
    answer: {
      // index of answer
      type: Number,
      maxlength: 1,
      required: true,
    },
    correction: {
      type: String, //Why the correct answer is correct
      required: true,
    },
  },
  index: Number,
  taskId: { type: mongoose.Schema.Types.ObjectId, ref: "Task" },
});

module.exports = mongoose.model("Todo", todoSchema);
