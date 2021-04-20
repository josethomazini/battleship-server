const Player = require('../model/Player');
const Room = require('../model/Room');
const activeConnections = require('../SocketConnections');

async function saveNewPlayer(socket) {
  const currentUser = await Player.create({
    socketid: socket.id,
    state: 'created',
    grid: null,
  });

  activeConnections[socket.id] = socket;
  return currentUser;
}

async function tryToAllocateEnemy() {
  const instance = await Player.findOneAndUpdate(
    { state: 'awaiting' },
    { state: 'playing' },
  );
  return instance;
}

async function setPlayerToState(socketid, state) {
  await Player.findOneAndUpdate(
    { socketid },
    { state },
  );
}

async function createRoom(currentUser, enemy) {
  await Room.create({
    player1: enemy,
    player2: currentUser,
    player1_plays: true,
  });
}

async function connectionHandler(socket) {
  const currentUser = await saveNewPlayer(socket);

  const enemy = await tryToAllocateEnemy();

  if (enemy == null) {
    await setPlayerToState(socket.id, 'awaiting');
    return;
  }

  const enemySocket = activeConnections[enemy.socketid];
  if (enemySocket === undefined) {
    delete activeConnections[enemy.socketid];
    await setPlayerToState(socket.id, 'awaiting');
    await setPlayerToState(enemy.socketid, 'ended');
    return;
  }
  await setPlayerToState(socket.id, 'playing');
  await setPlayerToState(enemy.socketid, 'playing');
  await createRoom(currentUser, enemy);

  socket.emit('start-grid', null);
  enemySocket.emit('start-grid', null);
}

module.exports = {
  connectionHandler,
};
