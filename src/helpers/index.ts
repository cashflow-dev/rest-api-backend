import { ParameterizedContext } from 'koa';
import { ErrorBody } from '../interfaces/ErrorBody';
import Logger from '../libs/Logger';
import MONGO_ERROR from '../enums/MONGO_ERROR';
import { ValidationError } from './ValidationError';

export * from './NotFoundError';
export * from './ValidationError';

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
    case 'Service Unavailable':
      body = {
        statusCode: 503,
        errorCode: 503,
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

export const handleMongoErrors = (e: any): void => {
  if (e.errmsg.toLowerCase().includes(MONGO_ERROR.DUPLICATE)) {
    throw new ValidationError([
      `Duplicate entry: ${e.message
        .split(' index: ')[1]
        .split(' ')[0]
        .replace('_1', '')}`,
    ]);
  } else {
    Logger.error(e.message);
    throw new Error('Service Unavailable');
  }
};

export const getRequestedFields = (fields: string) => {
  const fieldsArr = fields.split(',');
  const requestedFields: any = { _id: 1 };
  fieldsArr.forEach(field => {
    requestedFields[field] = 1;
  });
  return requestedFields;
};

export default handleHttpErrors;
