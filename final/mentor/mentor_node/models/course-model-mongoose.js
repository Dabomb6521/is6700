const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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
    
  }
})