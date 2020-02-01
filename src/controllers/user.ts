/* eslint-disable no-param-reassign */
import { ParameterizedContext } from 'koa';
import serviceLaunch, { UserService } from '../services';
import ControllerBase from '../libs/ControllerBase';
import handleHttpErrors from '../libs/utils';
import HTTP_STATUS_CODE from '../enums/HTTP_STATUS_CODE';
import { SuccessBody } from '../interfaces/SuccessBody';

const UserController = (): any => {
  const service = UserService;
  const controllerBase = ControllerBase(service);
  const controller: any = {};
  controller.login = async (context: ParameterizedContext): Promise<void> => {
    try {
      const result = await serviceLaunch(service, 'login', context);
      context.status = HTTP_STATUS_CODE.OK;
      const body: SuccessBody = {
        message: 'ok',
        data: result,
        statusCode: HTTP_STATUS_CODE.OK,
      };
      context.body = body;
    } catch (e) {
      handleHttpErrors(e, context);
    }
  };

  controller.signup = async (context: ParameterizedContext): Promise<void> => {
    try {
      await serviceLaunch(service, 'create', context);
      context.status = HTTP_STATUS_CODE.OK;
    } catch (e) {
      handleHttpErrors(e, context);
    }
  };

  controller.rotate = async (context: ParameterizedContext): Promise<void> => {
    try {
      await serviceLaunch(service, 'rotate', context);
      context.status = HTTP_STATUS_CODE.OK;
    } catch (e) {
      handleHttpErrors(e, context);
    }
  };

  return Object.assign(controllerBase, controller);
};

export default UserController;
