const mongoose = require('mongoose');

const RoomSchema = new mongoose.Schema({
  player1: { type: mongoose.Schema.Types.ObjectId, ref: 'Player' },
  player2: { type: mongoose.Schema.Types.ObjectId, ref: 'Player' },
  player1_plays: Boolean,
});

module.exports = mongoose.model('Room', RoomSchema);
