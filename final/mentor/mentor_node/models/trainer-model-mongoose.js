const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const trainerSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    expertise: {
        type: String,
        required: true
    },
    bio: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Trainer', trainerSchema);