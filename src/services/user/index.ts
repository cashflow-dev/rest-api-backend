import UserModel, { comparePassword } from '../../models/User';
import { InputData } from '../../interfaces/InputData';
import { composeValidators, validateId } from '../../libs/validators';
import { validateCreateBody, validateUpdateBody } from './validators';
import ServiceBase from '../../libs/ServiceBase';
import { handleMongoErrors, generateJWT } from '../../libs/utils';
import { NotFoundError, UnauthorizedError } from '../../libs/errors';

export class UserService extends ServiceBase {
  public constructor(input: InputData) {
    super(input);
    this.Model = UserModel;
    this.validators.update = composeValidators(validateId, validateUpdateBody);
    this.validators.create = composeValidators(validateCreateBody);
    this.validators.login = composeValidators(validateCreateBody);
  }

  public async login(): Promise<any> {
    let user;
    try {
      user = await this.Model.findOne({ email: this.input.body.email });
      const isMatch = await comparePassword(this.input.body.password, user.password);
      if (!isMatch) {
        throw new UnauthorizedError();
      }

      return {
        token: generateJWT(),
      };
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
