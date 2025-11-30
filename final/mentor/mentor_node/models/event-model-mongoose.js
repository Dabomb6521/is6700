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
    required: true,
    validate: {
        validator: function(value) {
            return value.endsWith('.jpg') || value.endsWith('.png');
        },
        message: 'Image must end with .jpg or .png'
    }
  },
  date: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

module.exports = mongoose.model("Event", eventSchema);
