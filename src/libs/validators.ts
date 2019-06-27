import Joi from 'joi';
import joiObjectId from 'joi-objectid';
import _ from 'lodash';
import { InputData } from '../interfaces/InputData';

const ObjectId = joiObjectId(Joi);

/* eslint-disable no-param-reassign */
const stripNonEqual = (source: any, dest: any) => {
  const sourceEntries = Object.entries(source);
  const destKeys: any = Object.entries(dest);

  sourceEntries.forEach(([key, value]: any[], i: number) => {
    const isObject = typeof value === 'object' && value !== null;

    if (isObject) {
      stripNonEqual(source[key], dest[destKeys[i]]);
    }
    if (destKeys.includes(key)) {
      delete source[key];
    }
  });
};

const stripNotValidated = (schemas: object[], inputData: InputData) => {
  const fullSchema = schemas.reduce((a, b) => _.merge(a, b));
  return stripNonEqual(inputData, fullSchema);
};

export const composeValidators = (...functions: ((inputData: InputData) => void)[]) => {
  return function(inputData: InputData) {
    const schemas: any[] = [];
    functions.forEach(func => {
      const validatedSchema = func(inputData);
      schemas.push(validatedSchema);
    });
    stripNotValidated(schemas, inputData);
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

  Joi.validate(inputData, paramsSchema);
  return schema;
};

export const validateSearch = (inputData: InputData) => {
  const schema = {
    query: {
      search: Joi.string(),
    },
  };

  const querySchema = Joi.object().keys(schema);

  Joi.validate(inputData, querySchema);
  return schema;
};
export const validateQuery = (inputData: InputData) => {
  const schema = {
    query: {
      next: ObjectId().error(() => 'Not a valid cursor'),
      fields: Joi.string(),
      limit: Joi.number().max(50),
    },
  };

  const querySchema = Joi.object().keys(schema);

  Joi.validate(inputData, querySchema);
  return schema;
};
