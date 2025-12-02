const mongoose = require('mongoose');
const slugify = require('slugify');

const Schema = mongoose.Schema;

// Schema defines what the object should look like in database
const menuItemSchema = new Schema({
    name: {
        type: String,
        required: true,
        set: function(value) {
            // Set the slug
            this.slug = slugify(value, {lower: true, trim: true})
            // return the value that should be used for the name property
            return value;
        }
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        required: true
    },
    //reference to the associated MenuCategory
    category: {
        type: Schema.Types.ObjectId,
        ref: 'MenuCategory'
    }
    
})


// Model implements the schema and provides functions for working with the objects
module.exports = mongoose.model('MenuItem', menuItemSchema);