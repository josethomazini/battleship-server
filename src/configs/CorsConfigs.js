const cors = require('cors');
const { ORIGIN_WHITE_LIST } = require('./DotEnv');

const options = {
  origin(origin, callback) {
    if (ORIGIN_WHITE_LIST.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};

const corsConfig = cors(options);

module.exports = corsConfig;
