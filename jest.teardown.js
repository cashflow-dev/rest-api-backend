/* eslint-disable */
const mongoose = require('mongoose');
//const Logger = require('./src/libs/Logger.ts');

mongoose.Promise = global.Promise;

module.exports = async () => {
  //Logger.debug('Test teardown runs...');
  await mongoose.disconnect();
  await global.mongoServer.stop();
  //Logger.debug('Test teardown finished!');
};
