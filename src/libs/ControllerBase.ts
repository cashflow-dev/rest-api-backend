/* eslint-disable no-param-reassign */
import { ParameterizedContext } from 'koa';
import { serviceLaunch } from '../services';
import { SuccessBody } from '../interfaces/SuccessBody';
import { handleHttpErrors } from './utils';
import HTTP_STATUS_CODE from '../enums/HTTP_STATUS_CODE';

const ControllerBase = (service: any) => {
  const controller: any = {};

  controller.create = async (context: ParameterizedContext): Promise<void> => {
    try {
      await serviceLaunch(service, 'create', context);
      context.status = HTTP_STATUS_CODE.CREATED;
    } catch (e) {
      handleHttpErrors(e, context);
    }
  };

  controller.find = async (context: ParameterizedContext): Promise<void> => {
    try {
      const { users, next } = await serviceLaunch(service, 'find', context);
      context.staus = HTTP_STATUS_CODE.OK;
      const body: SuccessBody = {
        message: 'ok',
        data: users,
        next,
        statusCode: HTTP_STATUS_CODE.OK,
      };
      context.body = body;
    } catch (e) {
      handleHttpErrors(e, context);
    }
  };

  controller.findById = async (context: ParameterizedContext): Promise<void> => {
    try {
      const user = await serviceLaunch(service, 'findById', context);
      context.staus = HTTP_STATUS_CODE.OK;
      const body: SuccessBody = {
        message: 'ok',
        data: user,
        statusCode: HTTP_STATUS_CODE.OK,
      };
      context.body = body;
    } catch (e) {
      handleHttpErrors(e, context);
    }
  };

  controller.update = async (context: ParameterizedContext): Promise<void> => {
    try {
      await serviceLaunch(service, 'update', context);
      context.status = HTTP_STATUS_CODE.NO_CONTENT;
    } catch (e) {
      handleHttpErrors(e, context);
    }
  };

  controller.deleteById = async (context: ParameterizedContext): Promise<void> => {
    try {
      await serviceLaunch(service, 'delete', context);
      context.status = HTTP_STATUS_CODE.NO_CONTENT;
    } catch (e) {
      handleHttpErrors(e, context);
    }
  };

  return controller;
};

export default ControllerBase;
