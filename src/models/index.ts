import mongoose from 'mongoose';

export * from './User';
mongoose.Promise = global.Promise;

type Callback = (err: string) => any;

export const connect = async (uri: string, errorHandler: Callback) => {
  if (process.env.NODE_ENV === 'PRODUCTION' || process.env.NODE_ENV === 'DEVELOPMENT') {
    try {
      await mongoose.connect(uri, { useNewUrlParser: true });
    } catch (e) {
      errorHandler(e);
    }
  }
};
