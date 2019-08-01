import Router from 'koa-router';
import SessionController from '../../controllers/session';

const router = new Router({ prefix: '/session' });
const controller = SessionController();

router.get('/session', controller.refresh);
router.post('/session', controller.signIn);
router.delete('/session', controller.destroy);

export default router;
