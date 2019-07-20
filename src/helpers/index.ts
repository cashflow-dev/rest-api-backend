import { ParameterizedContext } from 'koa';
import { ErrorBody } from '../interfaces/ErrorBody';
import Logger from '../libs/Logger';

// TODO: FIX
// export * from './NotFoundError';
// export * from './ValidationError';
/* eslint-disable no-param-reassign */
export const handleHttpErrors = (e: any, context: ParameterizedContext): void => {
  let body: ErrorBody | null = null;
  switch (e.message) {
    case 'ValidationError':
      context.status = 400;
      body = {
        statusCode: 400,
        errorCode: 400,
        errors: e.validationMessages,
        message: e.message,
      };
      break;
    case 'NotFoundError':
      context.status = 404;
      body = {
        statusCode: 404,
        errorCode: 404,
        errors: e.message,
        message: e.message,
      };
      break;
    default:
      Logger.error(e);
      context.throw();
  }
  context.body = body;
};

export default handleHttpErrors;