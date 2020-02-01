import { Schema, model, Document } from 'mongoose';
import bcrypt from 'bcrypt';
import timestamps from 'mongoose-timestamp';

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

type Callback = (error: null | Error, isMatch?: boolean) => void;
userSchema.methods.comparePassword = function(candidatePassword: string, cb: Callback) {
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
    return null;
  });
};

// Temporary solution
export const comparePassword = (password: string, hashedPassword: string) =>
  new Promise((resolve, reject) => {
    bcrypt.compare(password, hashedPassword, function(err: any, isMatch: boolean) {
      if (err) return reject(err);
      return resolve(isMatch);
    });
  });

userSchema.plugin(timestamps);

export default model<User>('User', userSchema);
