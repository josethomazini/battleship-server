const mongoose = require('mongoose');

const PlayerSchema = new mongoose.Schema({
  socketid: String,
  state: String, // created, awaiting, playing, ended
  grid: Array,
  bombgrid: Array,
});

module.exports = mongoose.model('Player', PlayerSchema);
