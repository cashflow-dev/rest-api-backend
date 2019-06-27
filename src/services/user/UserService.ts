import User from '../../models/User';
import { InputData } from '../../interfaces/InputData';
import { Service } from '../../interfaces/Service';
import { composeValidators, validateId, validateQuery } from '../../libs/validators';
import { validateCreateBody, validateUpdateBody } from './validators';

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

  public async findById(): Promise<any> {
    return User.findById(this.input.query.id);
  }

  public async create(): Promise<any> {
    const user = new User(this.input.body);
    user.save();
    return user;
  }

  public async find(): Promise<any> {
    return User.find();
  }

  public async update(): Promise<any> {
    return User.findByIdAndUpdate(this.input.params.id, this.input.body);
  }

  public async delete(): Promise<any> {
    return User.findByIdAndDelete(this.input.params.id);
  }
}

export default UserService;
