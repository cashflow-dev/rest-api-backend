import Router from 'koa-router';
import UserController from '../../controllers/user';

const router = new Router({ prefix: '/session' });
const controller = UserController();

router.get('/rotate', controller.rotate);
router.post('/login', controller.login);
router.post('/signup', controller.signup);

export default router;
