import combineRouters from 'koa-combine-routers';
import userRouter from './user';
import accountRouter from './account';
import rootRouter from './root';

const router = combineRouters(accountRouter, userRouter, rootRouter);

export default router;
