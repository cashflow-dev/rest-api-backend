/* eslint-disable no-param-reassign */
import Joi from '@hapi/joi';
import joiObjectId from 'joi-objectid';
import { InputData } from '../../interfaces/InputData';
import Logger from '../../libs/Logger';
import { ValidationError } from '../../libs/errors';

const ObjectId = joiObjectId(Joi);

export const validateCreateBody = (inputData: InputData) => {
  const schema = {
    body: {
      ownerId: ObjectId().required(),
      name: Joi.string(),
      balance: Joi.number(),
    },
  };

  const bodySchema = Joi.object().keys(schema);
  const result = Joi.validate(inputData, bodySchema, { stripUnknown: { arrays: true, objects: true } });
  if (result.error) {
    const validationMessages = result.error.details.map(error => error.message);
    validationMessages.forEach(Logger.debug);
    throw new ValidationError(validationMessages);
  }
  inputData.body = result.value.body;
};

export const validateUpdateBody = (inputData: InputData) => {
  const schema = {
    body: {
      ownerId: ObjectId(),
      name: Joi.string(),
      balance: Joi.number(),
    },
  };

  const bodySchema = Joi.object()
    .keys(schema)
    .or('body.ownerId', 'body.name', 'body.balance');

  const result = Joi.validate(inputData, bodySchema, { stripUnknown: { arrays: true, objects: true } });
  console.log({ result });
  if (result.error) {
    const validationMessages = result.error.details.map(error => error.message);
    validationMessages.forEach(Logger.debug);
    throw new ValidationError(validationMessages);
  }
  inputData.body = result.value.body;
};
