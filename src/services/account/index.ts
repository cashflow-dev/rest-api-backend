/* eslint-disable import/prefer-default-export */
import AccountModel from '../../models/Account';
import { InputData } from '../../interfaces/InputData';
import ServiceBase from '../../libs/ServiceBase';
import { composeValidators, validateId } from '../../libs/validators';
import { validateCreateBody, validateUpdateBody } from './validators';

export class AccountService extends ServiceBase {
  public constructor(input: InputData) {
    super(input);
    this.Model = AccountModel;
    this.validators.update = composeValidators(validateId, validateUpdateBody);
    this.validators.create = composeValidators(validateCreateBody);
  }
}
