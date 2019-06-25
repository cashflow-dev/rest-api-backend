import Router from 'koa-router';

const router = new Router({ prefix: '/user' });

router.get(
  '/',
  async (ctx, next): Promise<void> => {
    ctx.body = 'Some User';
    next();
  },
);

export default router;
