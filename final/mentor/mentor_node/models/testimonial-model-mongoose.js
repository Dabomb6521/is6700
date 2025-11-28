const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const testimonialSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true
    },
    jobTitle: {
        type: String,
        required: true
    },
    starRating: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    testimonial: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Testimonial', testimonialSchema);