const mongoose = require("mongoose");
const getIdSchema = require("../../utils/getIdSchema");

const moduleSchema = new mongoose.Schema({
  title: { type: String, required: true },
  note: {
    type: String,
    maxlength: 30000,
  },
  index: Number,
  phaseId: { type: mongoose.Schema.Types.ObjectId, ref: "Phase" },
});
module.exports = mongoose.model("Module", moduleSchema);
