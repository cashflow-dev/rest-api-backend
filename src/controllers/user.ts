/* eslint-disable no-param-reassign */
import { UserService } from '../services';
import ControllerBase from '../libs/ControllerBase';

const UserController = () => {
  const service = UserService;
  const controllerBase = ControllerBase(service);
  const controller: any = {};
  return Object.assign(controllerBase, controller);
};

export default UserController;
