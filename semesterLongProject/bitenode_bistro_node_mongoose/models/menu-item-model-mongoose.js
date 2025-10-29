const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const slugify = require("slugify");

const menuItemSchema = new Schema({
  name: {
    type: String,
    required: true,
    set: function (value) {
      // Set the slug field
      this.slug = slugify(value, { lower: true, trim: true });
      // Set the name field by returning a value
      return value;
    },
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
  },
  // reference to the associated MenuCategory
  category: {
    type: Schema.Types.ObjectId,
    ref: "MenuCategory"
  },
});

module.exports = mongoose.model("MenuItem", menuItemSchema);
