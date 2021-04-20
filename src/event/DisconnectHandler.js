/* eslint-disable no-underscore-dangle */

const Player = require('../model/Player');
const Room = require('../model/Room');

const activeConnections = require('../SocketConnections');

async function disconnectHandler(socket) {
  const player = await Player.findOneAndUpdate(
    { socketid: socket.id },
    { state: 'ended' },
  );

  if (socket.id in activeConnections) {
    delete activeConnections[socket.id];
  }

  const room = await Room.findOne().or([
    { player1: player._id },
    { player2: player._id },
  ]);

  if (!room) {
    return;
  }

  let enemyId = null;
  if (String(room.player1._id) === String(player._id)) {
    enemyId = room.player2._id;
  } else if (String(room.player2._id) === String(player._id)) {
    enemyId = room.player1._id;
  } else {
    throw Error('Illegal room state');
  }

  const enemy = await Player.findOneAndUpdate(
    { _id: enemyId },
    { state: 'ended' },
  );

  if (enemy.socketid in activeConnections) {
    activeConnections[enemy.socketid].emit('sudden-death', null);
    delete activeConnections[enemy.socketid];
  }
}

module.exports = {
  disconnectHandler,
};
