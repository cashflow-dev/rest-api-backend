declare module 'joi-objectid' {
  import joi, { StringSchema } from 'joi';

  export default function joiObjectId(Joi: typeof joi): () => StringSchema;
}
