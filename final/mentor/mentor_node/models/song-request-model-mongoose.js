const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const songRequestSchema = new Schema({
  spotifyId: {
    type: String,
    required: true
  },
  songName: {
    type: String,
    required: true
  },
  artistName: {
    type: String,
    required: true
  },
  albumName: {
    type: String,
    required: true
  },
  imageUrl: String,
  spotifyUrl: String,
  requestedBy: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  requestedAt: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    enum: ['pending', 'played', 'rejected'],
    default: 'pending'
  }
});

module.exports = mongoose.model('SongRequest', songRequestSchema);