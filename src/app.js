const mongoose = require('mongoose');
const { createServer } = require('http');
const { Server } = require('socket.io');

const { MONGODB_STR_CONNECTION, ORIGIN_WHITE_LIST } = require('./configs/DotEnv');
const mongooseOptions = require('./configs/MongoConfigs');

const { connectionHandler } = require('./event/ConnectionHandler');

mongoose.connect(MONGODB_STR_CONNECTION, mongooseOptions);

const httpServer = createServer();
const io = new Server(httpServer, {
  cors: {
    origin: ORIGIN_WHITE_LIST,
    methods: ['GET', 'POST'],
  },
});
httpServer.listen(3000);

io.on('connection', connectionHandler);

module.exports = io;
