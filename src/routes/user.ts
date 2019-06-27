import Router from 'koa-router';
import * as userController from '../controllers/user';

const router = new Router({ prefix: '/user' });

router.get('/:id', userController.findById);
router.post('/', userController.create);
router.patch('/:id', userController.update);
router.get('/', userController.find);
router.delete('/:id', userController.deleteById);

export default router;
