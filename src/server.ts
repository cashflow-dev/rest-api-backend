import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import logger from 'koa-logger';
import cors from '@koa/cors';
import debug from 'debug';
import router from './routes';

const PORT = 3003;

const app = new Koa();
app.use(cors());
app.use(bodyParser());
app.use(logger());
app.use(router());

app.listen(PORT, (): void => {
  debug(`API Server listening on port: ${PORT}`);
});
