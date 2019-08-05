import { Schema, model, Document } from 'mongoose';
import bcrypt from 'bcrypt';
import timestamps from 'mongoose-timestamp';
import { ValidationError } from '../libs/errors';

const saltRounds = 10;

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

userSchema.pre('save', function(next) {
  const user = this as User;

  if (!user.isModified('password')) return next();

  bcrypt.genSalt(saltRounds, function(err, salt) {
    if (err) return next(err);

    bcrypt.hash(user.password, salt, function(error, hash) {
      if (error) return next(error);

      user.password = hash;
      next();
      return null;
    });
    return null;
  });
  return null;
});

userSchema.methods.comparePassword = function(candidatePassword: string) {
  return new Promise((resolve, reject) => {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
      if (err) return reject(err);
      if (isMatch) return resolve(isMatch);
      throw new ValidationError(['Wrong password']);
    });
  });
};

userSchema.plugin(timestamps);

export default model<User>('User', userSchema);
