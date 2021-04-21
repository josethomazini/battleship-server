/* eslint-disable no-underscore-dangle */
const Player = require('../model/Player');
const Room = require('../model/Room');
const activeConnections = require('../SocketConnections');

async function gridHandler(socket, data) {
  const { grid } = data;

  const player = await Player.findOneAndUpdate(
    { socketid: socket.id },
    { grid },
  );

  const room = await Room.findOne().or([
    { player1: player._id },
    { player2: player._id },
  ]);

  let enemyId = null;
  let enemyIsPlayer1 = null;
  if (String(room.player1._id) === String(player._id)) {
    enemyId = room.player2._id;
    enemyIsPlayer1 = false;
  } else if (String(room.player2._id) === String(player._id)) {
    enemyId = room.player1._id;
    enemyIsPlayer1 = true;
  } else {
    throw Error('Illegal room state');
  }

  const enemy = await Player.findOne(
    { _id: enemyId },
  );

  const enemyGrid = Array(10).fill(null).map(() => Array(10).fill(null));

  if (enemy.grid !== null && enemy.socketid in activeConnections) {
    const enemySocket = activeConnections[enemy.socketid];
    socket.emit('start-room', { turn: !enemyIsPlayer1, enemyGrid });
    enemySocket.emit('start-room', { turn: enemyIsPlayer1, enemyGrid });
  }
}

module.exports = {
  gridHandler,
};
