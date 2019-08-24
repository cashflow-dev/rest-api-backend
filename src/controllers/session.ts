import { SessionService } from '../services';
import { ParameterizedContext } from 'koa';
import { serviceLaunch } from '../services';
import { SuccessBody } from '../interfaces/SuccessBody';
import { handleHttpErrors } from '../libs/utils';
import HTTP_STATUS_CODE from '../enums/HTTP_STATUS_CODE';

const service = SessionService;

const SessionController = () => {
  const controller: any = {};

  controller.create = async (context: ParameterizedContext) => {
    try {
      const token = await serviceLaunch(service, 'create', context);
      context.status = HTTP_STATUS_CODE.OK;
      const body: SuccessBody = {
        message: 'ok',
        data: {
          token,
        },
        statusCode: HTTP_STATUS_CODE.OK,
      };
      context.body = body;
    } catch (e) {
      handleHttpErrors(e, context);
    }
  };
  controller.destroy = async (context: ParameterizedContext) => {
    try {
      await serviceLaunch(service, 'destroy', context);
      context.status = HTTP_STATUS_CODE.NO_CONTENT;
    } catch (e) {
      handleHttpErrors(e, context);
    }
  };
  controller.refresh = async (context: ParameterizedContext) => {
    try {
      const token = await serviceLaunch(service, 'refresh', context);
      context.status = HTTP_STATUS_CODE.OK;
      const body: SuccessBody = {
        message: 'ok',
        data: {
          token,
        },
        statusCode: HTTP_STATUS_CODE.OK,
      };
      context.body = body;
    } catch (e) {
      handleHttpErrors(e, context);
    }
  };

  return controller;
};

export default SessionController;
