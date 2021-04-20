const mongoose = require('mongoose');
const { createServer } = require('http');
const { Server } = require('socket.io');

const { MONGODB_STR_CONNECTION, ORIGIN_WHITE_LIST } = require('./configs/DotEnv');
const mongooseOptions = require('./configs/MongoConfigs');

const { connectionHandler } = require('./event/ConnectionHandler');
const { gridHandler } = require('./event/GridHandler');
const { roomHandler } = require('./event/RoomHandler');
const { disconnectHandler } = require('./event/DisconnectHandler');

mongoose.connect(MONGODB_STR_CONNECTION, mongooseOptions);

const httpServer = createServer();
const io = new Server(httpServer, {
  cors: {
    origin: ORIGIN_WHITE_LIST,
    methods: ['GET', 'POST'],
  },
});
httpServer.listen(3000);

io.on('connection', (socket) => {
  connectionHandler(socket);

  socket.on('disconnect', () => {
    disconnectHandler(socket);
  });

  socket.on('send-grid', (data) => {
    gridHandler(socket, data);
  });

  socket.on('attack', (data) => {
    roomHandler(socket, data);
  });
});

module.exports = io;
