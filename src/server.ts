import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import logger from 'koa-logger';
import cors from '@koa/cors';
import debug from 'debug';
import fs from 'fs';
import router from './routes/index';
import { connect } from './models';
import Logger from './libs/Logger';
import 'dotenv/config';

const LOG_PATH = `${__dirname}/${process.env.LOG_PATH}`;

if (!fs.existsSync(LOG_PATH)) {
  fs.closeSync(fs.openSync(LOG_PATH, 'w'));
}

const DATABASE = `${process.env.MONGODB_URI}`;
console.log({ DATABASE });

const PORT = 3003;

connect(
  DATABASE,
  Logger.fatal,
);
const app = new Koa();
app.use(cors());
app.use(bodyParser());
app.use(logger());
app.use(router());

app.listen(PORT, (): void => {
  debug(`API Server listening on port: ${PORT}`);
});
