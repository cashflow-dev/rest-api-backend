import Joi from '@hapi/joi';
import { InputData } from '../../interfaces/InputData';
import ValidationError from '../../helpers/ValidationError';

export const validateUpdateBody = (inputData: InputData) => {
  const schema = {
    query: {
      email: Joi.string(),
      password: Joi.string(),
    },
  };

  const bodySchema = Joi.object()
    .keys(schema)
    .or('query.email', 'query.password');

  Joi.validate(inputData, bodySchema, { stripUnknown: { arrays: true, objects: true } });
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
    throw new ValidationError(validationMessages);
  }
};
