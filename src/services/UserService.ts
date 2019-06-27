import User from '../models/User';
import { InputData } from '../interfaces/InputData';
import { Service } from '../interfaces/Service';

export class UserService implements Service {
  private input: InputData;

  public validator: any;

  public constructor(input: InputData) {
    this.input = input;
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
