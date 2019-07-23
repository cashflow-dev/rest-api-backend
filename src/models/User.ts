import { Schema, model, Document } from 'mongoose';

interface User extends Document {
  email: string;
  password: string;
  currency: Currency;
}

interface Currency extends Document {
  origin: string;
}

const userSchema = new Schema({
  email: { type: String, unique: true },
  password: String,
  currency: {
    origin: String,
  },
});

export default model<User>('User', userSchema);
