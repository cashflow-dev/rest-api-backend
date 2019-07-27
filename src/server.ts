/* eslint-disable import/prefer-default-export */
import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import logger from 'koa-logger';
// TODO: See issue #19
// import memwatch from 'node-memwatch';
import cors from '@koa/cors';
import fs from 'fs';
import router from './routes/index';
import { connect } from './models';
import Logger from './libs/Logger';
import 'dotenv/config';

const LOG_PATH = `${__dirname}/${process.env.LOG_PATH}`;

if (!fs.existsSync(LOG_PATH)) {
  fs.closeSync(fs.openSync(LOG_PATH, 'w'));
}

// TODO: See issue #19
// memwatch.on('leak', Logger.fatal);
// memwatch.on('stats', Logger.fatal);

const DATABASE = `${process.env.MONGODB_URI}`;

const PORT = 3003;

connect(
  DATABASE,
  Logger.fatal,
);
export const app = new Koa();
app.use(cors());
app.use(bodyParser());
app.use(logger((str, args) => Logger.debug(`${str}: ${args}`)));
app.use(router());

if (!module.parent) {
  app.listen(PORT, (): void => {
    Logger.debug(`API Server listening on port: ${PORT}`);
  });
}
