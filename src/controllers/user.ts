/* eslint-disable no-param-reassign */
import { ParameterizedContext } from 'koa';
import { UserService, serviceLaunch } from '../services';
import { SuccessBody } from '../interfaces/SuccessBody';
import { handleHttpErrors } from '../helpers';
import HTTP_STATUS_CODE from '../enums/HTTP_STATUS_CODE';

export const create = async (context: ParameterizedContext): Promise<void> => {
  try {
    await serviceLaunch(UserService, 'create', context);
    context.status = HTTP_STATUS_CODE.CREATED;
  } catch (e) {
    handleHttpErrors(e, context);
  }
};

export const find = async (context: ParameterizedContext): Promise<void> => {
  try {
    const { users, next } = await serviceLaunch(UserService, 'find', context);
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

export const findById = async (context: ParameterizedContext): Promise<void> => {
  try {
    const user = await serviceLaunch(UserService, 'findById', context);
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

export const update = async (context: ParameterizedContext): Promise<void> => {
  try {
    await serviceLaunch(UserService, 'update', context);
    context.status = HTTP_STATUS_CODE.NO_CONTENT;
  } catch (e) {
    handleHttpErrors(e, context);
  }
};

export const deleteById = async (context: ParameterizedContext): Promise<void> => {
  try {
    await serviceLaunch(UserService, 'delete', context);
    context.status = HTTP_STATUS_CODE.NO_CONTENT;
  } catch (e) {
    handleHttpErrors(e, context);
  }
};
