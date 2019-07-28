import combineRouters from 'koa-combine-routers';
import userRouter from './User';

const router = combineRouters(userRouter);

export default router;
