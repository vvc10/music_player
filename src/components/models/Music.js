// models/Music.js
const mongoose = require('mongoose');

const musicSchema = new mongoose.Schema({
  title: String,
  imageUrl: String,
  // Add other fields as needed
});

const Music = mongoose.model('Music', musicSchema);

module.exports = Music;
