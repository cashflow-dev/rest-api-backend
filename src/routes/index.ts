import combineRouters from 'koa-combine-routers';
import userRouter from './user';

const router = combineRouters(userRouter);

export default router;
