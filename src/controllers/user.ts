/* eslint-disable no-param-reassign */
import { ParameterizedContext } from 'koa';
import { UserService, serviceLaunch } from '../services';
import { SuccessBody } from '../interfaces/SuccessBody';
import { handleHttpErrors } from '../helpers';

export const create = async (context: ParameterizedContext): Promise<void> => {
  try {
    await serviceLaunch(UserService, 'create', context);
    context.status = 201;
  } catch (e) {
    handleHttpErrors(e, context);
  }
};

export const find = async (context: ParameterizedContext): Promise<void> => {
  try {
    const { users, next } = await serviceLaunch(UserService, 'find', context);
    context.staus = 200;
    const body: SuccessBody = {
      message: 'ok',
      data: users,
      next,
      statusCode: 200,
    };
    context.body = body;
  } catch (e) {
    handleHttpErrors(e, context);
  }
};

export const findById = async (context: ParameterizedContext): Promise<void> => {
  try {
    const user = await serviceLaunch(UserService, 'findById', context);
    context.staus = 200;
    const body: SuccessBody = {
      message: 'ok',
      data: user,
      statusCode: 200,
    };
    context.body = body;
  } catch (e) {
    handleHttpErrors(e, context);
  }
};

export const update = async (context: ParameterizedContext): Promise<void> => {
  try {
    await serviceLaunch(UserService, 'update', context);
    context.status = 204;
  } catch (e) {
    handleHttpErrors(e, context);
  }
};

export const deleteById = async (context: ParameterizedContext): Promise<void> => {
  try {
    await serviceLaunch(UserService, 'delete', context);
    context.status = 204;
  } catch (e) {
    handleHttpErrors(e, context);
  }
};
