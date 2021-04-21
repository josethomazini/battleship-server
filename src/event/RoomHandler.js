/* eslint-disable no-underscore-dangle */

const Player = require('../model/Player');
const Room = require('../model/Room');
const activeConnections = require('../SocketConnections');

function isGameOver(enemyGrid, enemyBombGrid) {
  for (let x = 0; x < enemyGrid.length; x += 1) {
    const line = enemyGrid[x];

    for (let y = 0; y < line.length; y += 1) {
      const data = line[y];
      if (data !== null) {
        if (enemyBombGrid[x][y] !== 'bombsea'
        && enemyBombGrid[x][y] !== 'bombship') {
          return false;
        }
      }
    }
  }

  return true;
}

async function roomHandler(socket, data) {
  const { x, y } = data;

  const player = await Player.findOne(
    { socketid: socket.id },
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

  if (room.player1_plays === enemyIsPlayer1) {
    return;
  }

  let enemy = await Player.findOne(
    { _id: enemyId },
  );

  const enemyGrid = enemy.grid;
  const enemyBombGrid = enemy.bombgrid;

  if (enemyGrid[x][y] === null) {
    enemyBombGrid[x][y] = 'bombsea';
  } else {
    enemyBombGrid[x][y] = 'bombship';
  }

  await Room.findOneAndUpdate(
    { _id: room._id },
    { player1_plays: !room.player1_plays },
  );

  enemy = await Player.findOneAndUpdate(
    { _id: enemy._id },
    { bombgrid: enemyBombGrid },
  );

  const gameOver = isGameOver(enemyGrid, enemyBombGrid);

  if (enemy.socketid in activeConnections) {
    const enemySocket = activeConnections[enemy.socketid];
    socket.emit('update-room', {
      turn: false,
      enemyGrid: enemyBombGrid,
      gameOver,
    });
    enemySocket.emit('update-room', {
      turn: true,
      enemyGrid: player.bombgrid,
      gameOver,
    });
  }
}

module.exports = {
  roomHandler,
};
