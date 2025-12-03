const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const slugify = require("slugify");

const courseSchema = new Schema({
  title: {
    type: String,
    required: [true, "Title is required"],
    maxlength: 50,
    set: function (value) {
      this.titleSlug = slugify(value, { lower: true, trim: true });
      return value;
    },
  },
  image: {
    type: String,
    required: [true, "Image is required"],
    validate: {
      validator: function (value) {
        return (
          value.endsWith(".jpg") ||
          value.endsWith(".png") ||
          value.endsWith(".jpeg")
        );
      },
      message: "Image must end with .jpg, .jpeg or .png",
    },
  },
  summary: {
    type: String,
    required: [true, "Summary is required"],
    maxlength: [350, "Summary cannot exceed 350 characters"],
  },
  description: {
    type: String,
    required: [true, "Description is required"],
  },
  price: {
    type: Number,
    required: [true, "Price is required"],
    min: [0, "Price must be a positive number"],
  },
  capacity: {
    type: Number,
    required: [true, "Capacity is required"],
    min: [1, "Capacity must be at least 1"],
  },
  registrants: [
    {
      type: Schema.Types.ObjectId,
      refs: "User",
    },
  ],
  likes: {
    type: Number,
    default: 0,
    min: 0,
  },
  trainer: [
    {
      type: Schema.Types.ObjectId,
      ref: "Trainer",
      required: [true, "Trainer is required"],
    },
  ],
  schedule: {
    type: String,
    default: "TBD",
  },
  titleSlug: {
    type: String,
  },
});

module.exports = mongoose.model("Course", courseSchema);
