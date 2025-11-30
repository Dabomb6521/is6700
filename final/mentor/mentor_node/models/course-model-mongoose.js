const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const slugify = require('slugify');

const courseSchema = new Schema({
  title: {
    type: String,
    required: true,
    maxlength: 50,
    set: function(value) {
      this.slug = slugify(value, {lower: true, trim: true})
      return value
    }
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator: function(value) {
        return value.endsWith('.jpg') || value.endsWith('.png');
      },
      message: 'Image must end with .jpg or .png'
    }
  },
  summary: {
    type: String,
    required: true,
    maxlength: 350
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  capacity: {
    type: Number,
    required: true
  },
  registrants: [{
    type: Schema.Types.ObjectId,
    refs: 'User'
  }],
  likes: {
    type: Number,
    default: 0
  },
  trainer: [{
    type: Schema.Types.ObjectId,
    ref: "Trainer",
    required: true
  }],
  schedule: {
    type: Date
  },
  titleSlug: {
    type: String
  }
});

module.exports = mongoose.model('Course', courseSchema);