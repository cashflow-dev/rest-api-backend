/* eslint-disable import/prefer-default-export */
import UserModel from '../../models/User';
import { InputData } from '../../interfaces/InputData';
import { Service } from '../../interfaces/Service';
import { composeValidators } from '../../libs/validators';

export class AccountService implements Service {
  public input: InputData;

  public Model: any;

  public validators: any;

  public constructor(input: InputData) {
    this.input = input;
    this.Model = UserModel;
    this.validators = {
      destroy: composeValidators(),
      signIn: composeValidators(),
      refresh: composeValidators(),
    };
  }

  public async destroy(): Promise<any> {}
  public async signIn(): Promise<any> {}
  public async refresh(): Promise<any> {}
}
