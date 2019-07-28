declare module 'joi-objectid' {
  import joi, { StringSchema } from '@hapi/joi';

  export default function joiObjectId(Joi: typeof joi): () => StringSchema;
}
