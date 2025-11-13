const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const contactSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Please provide your name.'], // Custom Validation
    minLength: [1, "Name must be at least 1 character"],
  },
  email: {
    type: String,
    required: true,
    validate: {
      validator: (value) => { return /^[^\s@]+@[^\s@]+\.(com|net)$/i.test(value);},
      message: props => `${props.value} is not a valid email. Please enter a valid email address ending in .com or .net`,
    },
  },
  subject: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
    default: Date.now,
  },
  response: {
    type: String,
    required: false,
  },
  responseDate: {
    type: Date,
    required: false,
  },
});

// Create and export the module based on the schema
module.exports = mongoose.model("Contact", contactSchema);
