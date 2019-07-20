import Joi from '@hapi/joi';
import joiObjectId from 'joi-objectid';
import _ from 'lodash';
import { InputData } from '../interfaces/InputData';

const ObjectId = joiObjectId(Joi);

/* eslint-disable no-param-reassign */
/* const stripNonEqual = (source: any, dest: any) => {
  const sourceEntries = Object.entries(source);
  const destKeys: any = Object.entries(dest);

  sourceEntries.forEach(([key, value]: any[], i: number) => {
    const isObject = typeof value === 'object' && value !== null && !Array.isArray(value);

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
}; */

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

  Joi.validate(inputData, paramsSchema, { stripUnknown: { arrays: true, objects: true } });
};

export const validateSearch = (inputData: InputData) => {
  const schema = {
    query: {
      search: Joi.string(),
    },
  };

  const querySchema = Joi.object().keys(schema);

  Joi.validate(inputData, querySchema, { stripUnknown: { arrays: true, objects: true } });
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

  Joi.validate(inputData, querySchema, { stripUnknown: { arrays: true, objects: true } });
};
