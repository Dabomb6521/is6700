const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const slugify = require('slugify');

const menuCategorySchema = new Schema({
    name: {
        type: String,
        required: true,
        set: function(value) {
            // Set the slug field
            this.slug = slugify(value, {lower: true, trim: true})

            // Set the name field by returning a value
            return value;
        }
    },
    adjective: {
        type: String,
        required: true
    },
    icon: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        required: true
    },
    // Reference associated MenuItems
    items: [{
        type: Schema.Types.ObjectId,
        ref: 'MenuItem'
    }]
});

// Create and export the model based on the schema
module.exports = mongoose.model("MenuCategory", menuCategorySchema);