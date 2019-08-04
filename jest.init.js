/* eslint-disable */

const { MongoMemoryServer } = require('mongodb-memory-server');
const mongoose = require('mongoose');
//const Logger = require('./src/libs/Logger.ts');

mongoose.Promise = global.Promise;

/* eslint-disable import/prefer-default-export */
module.exports = async () => {
  //Logger.debug('Test setup runs...');
  // jest.setTimeout(30000);
  try {
    const mongoServer = new MongoMemoryServer();
    global.mongoServer = mongoServer;
    const uri = await mongoServer.getConnectionString();
    const mongooseOpts = {
      autoReconnect: true,
      reconnectTries: Number.MAX_VALUE,
      reconnectInterval: 1000,
      useNewUrlParser: true,
      useCreateIndex: true,
    };

    mongoose.connect(uri, mongooseOpts);
    mongoose.connection.on('error', e => {
      if (e.message.code === 'ETIMEDOUT') {
        //Logger.debug(e);
        mongoose.connect(uri, mongooseOpts);
      }
      //Logger.debug(e);
    });
    mongoose.connection.once('open', () => {
      // Logger.debug('connecting');
      //Logger.debug(`MongoDB successfully connected to ${uri}`);
    });
  } catch (e) {
    //Logger.debug(e);
  }
  //Logger.debug('Test setup finished!');
};
