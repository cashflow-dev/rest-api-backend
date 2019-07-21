import { ParameterizedContext } from 'koa';
import { ErrorBody } from '../interfaces/ErrorBody';
import Logger from '../libs/Logger';
import MONGO_ERROR from '../enums/MONGO_ERROR';
import { ValidationError } from './ValidationError';
import HTTP_STATUS_CODE from '../enums/HTTP_STATUS_CODE';

export * from './NotFoundError';
export * from './ValidationError';

/* eslint-disable no-param-reassign */
export const handleHttpErrors = (e: any, context: ParameterizedContext): void => {
  let body: ErrorBody | null = null;
  switch (e.message) {
    case 'ValidationError':
      context.status = HTTP_STATUS_CODE.BAD_REQUEST;
      body = {
        statusCode: HTTP_STATUS_CODE.BAD_REQUEST,
        errorCode: HTTP_STATUS_CODE.BAD_REQUEST,
        errors: e.validationMessages,
        message: e.message,
      };
      break;
    case 'NotFoundError':
      context.status = HTTP_STATUS_CODE.NOT_FOUND;
      body = {
        statusCode: HTTP_STATUS_CODE.NOT_FOUND,
        errorCode: HTTP_STATUS_CODE.NOT_FOUND,
        errors: e.message,
        message: e.message,
      };
      break;
    case 'Service Unavailable':
      body = {
        statusCode: HTTP_STATUS_CODE.SERVICE_UNAVAILABLE,
        errorCode: HTTP_STATUS_CODE.SERVICE_UNAVAILABLE,
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
