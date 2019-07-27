import Joi from '@hapi/joi';
import { InputData } from '../../interfaces/InputData';
import { ValidationError } from '../../libs/errors';
import Logger from '../../libs/Logger';

export const validateUpdateBody = (inputData: InputData) => {
  const schema = {
    body: {
      email: Joi.string(),
      password: Joi.string(),
    },
  };

  const bodySchema = Joi.object()
    .keys(schema)
    .or('body.email', 'body.password');

  const result = Joi.validate(inputData, bodySchema, { stripUnknown: { arrays: true, objects: true } });
  if (result.error) {
    const validationMessages = result.error.details.map(error => error.message);
    validationMessages.forEach(Logger.debug);
    throw new ValidationError(validationMessages);
  }
};
export const validateCreateBody = (inputData: InputData) => {
  const schema = {
    body: {
      email: Joi.string().required(),
      password: Joi.string().required(),
    },
  };

  const bodySchema = Joi.object().keys(schema);
  const result = Joi.validate(inputData, bodySchema, { stripUnknown: { arrays: true, objects: true } });
  if (result.error) {
    const validationMessages = result.error.details.map(error => error.message);
    validationMessages.forEach(Logger.debug);
    throw new ValidationError(validationMessages);
  }
};
