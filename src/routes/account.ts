import Router from 'koa-router';

const router = new Router({ prefix: '/account' });

router.get(
  '/',
  async (ctx, next): Promise<void> => {
    ctx.body = 'Some account';
    next();
  },
);

export default router;
