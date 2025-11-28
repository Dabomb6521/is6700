const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const slugify = require('slugify');

const courseSchema = new Schema({
  title: {
    type: String,
    required: true,
    set: function(value) {
      this.slug = slugify(value, {lower: true, trim: true})
      return value
    }
  },
  image: {
    type: String,
    required: true,
    
  },
  summary: {
    type: String,
    required: true
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
})