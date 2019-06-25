import combineRouters from 'koa-combine-routers';
import rootRouter from './user';
import userRouter from './account';

const router = combineRouters(rootRouter, userRouter);

export default router;
