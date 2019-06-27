import Joi from 'joi';
import { InputData } from '../../interfaces/InputData';

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

  Joi.validate(inputData, bodySchema);
  return schema;
};
export const validateCreateBody = (inputData: InputData) => {
  const schema = {
    query: {
      email: Joi.string(),
      password: Joi.string(),
    },
  };

  const bodySchema = Joi.object().keys(schema);

  Joi.validate(inputData, bodySchema);
  return schema;
};
