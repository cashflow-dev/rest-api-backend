import { MongoMemoryServer } from 'mongodb-memory-server';
import Logger from './src/libs/Logger';
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
const globalAny: any = global;

let mongoServer: any;
jest.setTimeout(30000);

const setup = async () => {
  Logger.debug('Test setup runs...');
  try {
    mongoServer = new MongoMemoryServer();
    globalAny.mongoServer = mongoServer as any;
    const uri = await mongoServer.getConnectionString();
    const mongooseOpts = {
      autoReconnect: true,
      reconnectTries: Number.MAX_VALUE,
      reconnectInterval: 1000,
      useNewUrlParser: true,
      useCreateIndex: true,
    };

    mongoose.connect(uri, mongooseOpts);
    mongoose.connection.on('error', (e: any) => {
      if (e.message.code === 'ETIMEDOUT') {
        Logger.debug(e);
        mongoose.connect(uri, mongooseOpts);
      }
      Logger.debug(e);
    });
    mongoose.connection.once('open', () => {
      Logger.debug('connecting');
      Logger.debug(`MongoDB successfully connected to ${uri}`);
    });
  } catch (e) {
    Logger.debug(e);
  }
  Logger.debug('Test setup finished!');
};

(async () => {
  //await setup();
})();
