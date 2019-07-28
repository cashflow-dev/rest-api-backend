import Logger from './src/libs/Logger';
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const globalAny: any = global;

const teardown = async () => {
  Logger.debug('Test teardown runs...');
  await mongoose.disconnect();
  await globalAny.mongoServer.stop();
  Logger.debug('Test teardown finished!');
};

export default teardown;
