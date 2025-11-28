const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const eventSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  summary: {
    type: String,
    required: true,
  },
  image: {
    type: Image,
    required: true
  },
  date: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

module.exports = mongoose.model("Event", eventSchema);
