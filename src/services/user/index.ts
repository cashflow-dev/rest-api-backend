import UserModel, { User } from '../../models/User';
import { InputData } from '../../interfaces/InputData';
import { Service } from '../../interfaces/Service';
import { composeValidators, validateId, validateQuery } from '../../libs/validators';
import { validateCreateBody, validateUpdateBody } from './validators';
import ValidationError from '../../helpers/ValidationError';
import NotFoundError from '../../helpers/NotFoundError';
import Logger from '../../libs/Logger';
import MONGO_ERROR from '../../enums/MONGO_ERROR';

export class UserService implements Service {
  public input: InputData;

  public validators: any;

  public constructor(input: InputData) {
    this.input = input;
    this.validators = {
      find: composeValidators(validateQuery),
      findById: composeValidators(validateId),
      update: composeValidators(validateId, validateUpdateBody),
      create: composeValidators(validateCreateBody),
      delete: composeValidators(validateId),
    };
  }

  public async findById(): Promise<User> {
    const user = await UserModel.findById(this.input.query.id);
    if (user === null) {
      throw new NotFoundError();
    }
    return user;
  }

  public async create(): Promise<User | undefined> {
    let result;
    try {
      const user = new UserModel(this.input.body);
      result = await user.save();
      return result;
    } catch (e) {
      if (e.errmsg.toLowerCase().includes(MONGO_ERROR.DUPLICATE)) {
        throw new ValidationError([
          `Duplicate entry: ${e.message
            .split(' index: ')[1]
            .split(' ')[0]
            .replace('_1', '')}`,
        ]);
      } else {
        Logger.error(e.message);
      }
    }
    return result;
  }

  public async find(): Promise<User[]> {
    return UserModel.find();
  }

  public async update(): Promise<User | null> {
    const user = UserModel.findByIdAndUpdate(this.input.params.id, this.input.body);
    if (user === null) {
      throw new NotFoundError();
    }
    return user;
  }

  public async delete(): Promise<User | null> {
    const user = UserModel.findByIdAndDelete(this.input.params.id);
    if (user === null) {
      throw new NotFoundError();
    }
    return user;
  }
}

export default UserService;
