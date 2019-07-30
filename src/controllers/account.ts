import ControllerBase from '../libs/ControllerBase';
import { AccountService } from '../services';

const AccountController = () => {
  const service = AccountService;
  const controllerBase = ControllerBase(service);
  const controller: any = {};
  return Object.assign(controllerBase, controller);
};

export default AccountController;
