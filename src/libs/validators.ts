/* eslint-disable no-param-reassign */
import Joi from '@hapi/joi';
import joiObjectId from 'joi-objectid';
import _ from 'lodash';
import { InputData } from '../interfaces/InputData';
import { ValidationError } from './errors';
import Logger from './Logger';

const ObjectId = joiObjectId(Joi);

export const composeValidators = (...functions: ((inputData: InputData) => void)[]) => {
  return function(inputData: InputData) {
    functions.forEach(func => {
      func(inputData);
    });
  };
};

export const validateId = (inputData: InputData) => {
  const schema = {
    params: {
      id: ObjectId()
        .required()
        .error(() => 'Not a valid id'),
    },
  };

  const paramsSchema = Joi.object().keys(schema);

  const result = Joi.validate(inputData, paramsSchema, { stripUnknown: { arrays: true, objects: true } });
  if (result.error) {
    const validationMessages = result.error.details.map(error => error.message);
    validationMessages.forEach(Logger.debug);
    throw new ValidationError(validationMessages);
  }
  inputData.params = result.value.params;
};

export const validateSearch = (inputData: InputData) => {
  const schema = {
    query: {
      search: Joi.string(),
    },
  };

  const querySchema = Joi.object().keys(schema);

  const result = Joi.validate(inputData, querySchema, { stripUnknown: { arrays: true, objects: true } });
  if (result.error) {
    const validationMessages = result.error.details.map(error => error.message);
    validationMessages.forEach(Logger.debug);
    throw new ValidationError(validationMessages);
  }
  inputData.query = result.value.query;
};
export const validateQuery = (inputData: InputData) => {
  const schema = {
    query: {
      next: ObjectId().error(() => 'Not a valid cursor'),
      fields: Joi.string(),
      limit: Joi.number()
        .max(50)
        .min(1),
    },
  };

  const querySchema = Joi.object().keys(schema);

  const result = Joi.validate(inputData, querySchema, { stripUnknown: { arrays: true, objects: true } });
  if (result.error) {
    const validationMessages = result.error.details.map(error => error.message);
    validationMessages.forEach(Logger.debug);
    throw new ValidationError(validationMessages);
  }
  inputData.query = result.value.query;
};
