/* eslint-disable no-param-reassign */
import Router from 'koa-router';

const router = new Router({ prefix: '/root' });

router.get('/', async (context: any) => {
  context.body = 'Hello world';
});
export default router;
