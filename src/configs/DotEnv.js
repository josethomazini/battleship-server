const dotenv = require('dotenv');

dotenv.config();

const DEFAULTS = {
  SERVER_PORT: 8080,
};

const readServerPort = () => {
  if (process.env.SERVER_PORT === undefined) {
    return DEFAULTS.SERVER_PORT;
  }
  return parseInt(process.env.SERVER_PORT, 10);
};

const readMongoDbStrConnection = () => {
  if (process.env.MONGODB_STR_CONNECTION === undefined) {
    throw Error('No mongo str connection found');
  }
  return process.env.MONGODB_STR_CONNECTION;
};

const readOriginWhiteList = () => {
  if (process.env.ORIGIN_WHITE_LIST === undefined) {
    return [];
  }
  return process.env.ORIGIN_WHITE_LIST.split(',');
};

module.exports = {
  MONGODB_STR_CONNECTION: readMongoDbStrConnection(),
  SERVER_PORT: readServerPort(),
  ORIGIN_WHITE_LIST: readOriginWhiteList(),
};
