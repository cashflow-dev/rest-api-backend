import { ParameterizedContext } from 'koa';
import { UserService } from '../services/UserService';
import { serviceLaunch } from '../services';

export const create = async (context: ParameterizedContext): Promise<void> => {
  const userService = serviceLaunch(UserService, context);
  userService.create();
};
export const find = async (context: ParameterizedContext): Promise<void> => {
  const userService = serviceLaunch(UserService, context);
  userService.find();
};
export const findById = async (context: ParameterizedContext): Promise<void> => {
  const userService = serviceLaunch(UserService, context);
  userService.findById();
};
export const update = async (context: ParameterizedContext): Promise<void> => {
  const userService = serviceLaunch(UserService, context);
  userService.update();
};
