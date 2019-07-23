import { Schema, model, Document } from 'mongoose';
import { bcrypt } from 'bcrypt';

const saltRounds = 10;

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

userSchema.pre('save', function(next) {
  const user = this;

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

userSchema.methods.comparePassword = function(candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
    return null;
  });
};

export default model<User>('User', userSchema);
