const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// Schema defines what the object should look like in database
const testimonialSchema = new Schema({
  content: {
    type: String,
    required: [true, "Please provide your testimonial."], // Custom validation message
  },
  date: {
    type: Date,
    default: Date.now,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User", // Reference to User model
  },
});

// Model implements the schema and provides functions for working with the objects
module.exports = mongoose.model("Testimonial", testimonialSchema);
