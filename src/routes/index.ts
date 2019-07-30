import combineRouters from 'koa-combine-routers';
import userRouter from './User';
import accountRouter from './Account';

const router = combineRouters(userRouter, accountRouter);

export default router;
