import combineRouters from 'koa-combine-routers';
import userRouter from './User';
import accountRouter from './Account';
import sessionRouter from './Session';

const router = combineRouters(userRouter, accountRouter, sessionRouter);

export default router;
