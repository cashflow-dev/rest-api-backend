import UserModel from '../../models/User';
import { InputData } from '../../interfaces/InputData';
import { composeValidators, validateId } from '../../libs/validators';
import { validateCreateBody, validateUpdateBody } from './validators';
import ServiceBase from '../../libs/ServiceBase';

export class UserService extends ServiceBase {
  public constructor(input: InputData) {
    super(input);
    this.Model = UserModel;
    this.validators.update = composeValidators(validateId, validateUpdateBody);
    this.validators.create = composeValidators(validateCreateBody);
  }

  public async checkPassword({ email, password}): Promise<boolean> {
    const user = await UserModel.find({email});
    await user.comparePassword(password);
  }
}

export default UserService;
