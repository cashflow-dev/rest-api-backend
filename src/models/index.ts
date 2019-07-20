import mongoose from 'mongoose';

export * from './User';
mongoose.Promise = global.Promise;

type Callback = (err: string) => any;

export const connect = async (uri: string, errorHandler: Callback) => {
  try {
    await mongoose.connect(uri, { useNewUrlParser: true });
  } catch (e) {
    console.log({ e });
    errorHandler(e);
  }
};
