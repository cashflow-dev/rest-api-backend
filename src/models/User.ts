import { Schema, model, Document } from 'mongoose';

export interface User extends Document {
  email: string;
  password: string;
  settings: Settings;
}

interface Settings extends Document {
  currency: string;
}

const userSchema = new Schema({
  email: { type: String, unique: true },
  password: String,
  settings: {
    currency: String,
  },
});

export default model<User>('User', userSchema);
