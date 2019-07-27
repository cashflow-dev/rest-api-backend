import Router from 'koa-router';
import UserController from '../../controllers/user';

const router = new Router({ prefix: '/user' });
const controller = UserController();

router.get('/:id', controller.findById);
router.post('/', controller.create);
router.patch('/:id', controller.update);
router.get('/', controller.find);
router.delete('/:id', controller.deleteById);

export default router;
