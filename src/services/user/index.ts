import UserModel, { User } from '../../models/User';
import { InputData } from '../../interfaces/InputData';
import { Service } from '../../interfaces/Service';
import { composeValidators, validateId, validateQuery } from '../../libs/validators';
import { validateCreateBody, validateUpdateBody } from './validators';
import NotFoundError from '../../helpers/NotFoundError';
import { getRequestedFields, handleMongoErrors } from '../../helpers';

export class UserService implements Service {
  public input: InputData;

  private DEFAULT_LIMIT: number;

  public validators: any;

  public constructor(input: InputData) {
    this.DEFAULT_LIMIT = 50;
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
    const requestedFields = this.input.fields ? getRequestedFields(this.input.fields) : { _id: 1 };
    const user = await UserModel.findById(this.input.params.id).select(requestedFields);
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
      handleMongoErrors(e);
    }
    return result;
  }

  public async find(): Promise<any> {
    /* eslint-disable no-underscore-dangle */
    const requestedFields = this.input.fields ? getRequestedFields(this.input.fields) : { _id: 1 };
    const queryFilter = this.input.next
      ? {
          _id: { $lt: this.input.next },
        }
      : {};
    const users: any = await UserModel.find(queryFilter)
      .select(requestedFields)
      .sort({ _id: -1 })
      .limit(Number(this.input.limit) || this.DEFAULT_LIMIT);
    return { users, next: users[users.length - 1]._id };
  }

  public async update(): Promise<User | null> {
    let user = null;
    try {
      user = await UserModel.findByIdAndUpdate(this.input.params.id, this.input.body);
    } catch (e) {
      handleMongoErrors(e);
    }
    if (user === null) {
      throw new NotFoundError();
    }
    return user;
  }

  public async delete(): Promise<User | null> {
    let user = null;
    try {
      user = await UserModel.findByIdAndDelete(this.input.params.id);
    } catch (e) {
      handleMongoErrors(e);
    }
    if (user === null) {
      throw new NotFoundError();
    }
    return user;
  }
}

export default UserService;
