import _ from 'lodash';
import { InputData } from '../interfaces/InputData';
import { Service } from '../interfaces/Service';
import { composeValidators, validateId, validateQuery } from './validators';
import { NotFoundError } from './errors';
import { getRequestedFields, handleMongoErrors } from './utils';

export class ServiceBase implements Service {
  public input: InputData;

  public DEFAULT_LIMIT: number;

  public Model: any;

  public requestedFields: any;

  public queryFilter: any;

  public validators: any;

  public constructor(input: InputData) {
    this.DEFAULT_LIMIT = 50;
    this.input = input;
    this.validators = {
      find: composeValidators(validateQuery),
      findById: composeValidators(validateId),
      delete: composeValidators(validateId),
    };

    /* eslint-disable no-underscore-dangle */
    this.requestedFields = this.input.fields ? getRequestedFields(this.input.fields) : { _id: 1 };
    this.queryFilter = this.input.next
      ? {
          _id: { $lt: this.input.next },
        }
      : {};
  }

  public async findById(): Promise<any> {
    let result;
    try {
      result = await this.Model.findById(this.input.params.id).select(this.requestedFields);
    } catch (e) {
      handleMongoErrors(e);
    }
    if (result === null) {
      throw new NotFoundError();
    }
    return result;
  }

  public async create(): Promise<any> {
    let result;
    try {
      const model = new this.Model(this.input.body);
      result = await model.save();
    } catch (e) {
      handleMongoErrors(e);
    }
    return result;
  }

  public async find(): Promise<any> {
    let results: any;
    try {
      results = await this.Model.find(this.queryFilter)
        .select(this.requestedFields)
        .sort({ _id: -1 })
        .limit(Number(this.input.limit) || this.DEFAULT_LIMIT);
    } catch (e) {
      handleMongoErrors(e);
    }
    return { users: results, next: _.get(results[results.length - 1], '_id', null) };
  }

  public async update(): Promise<any> {
    let result = null;
    try {
      result = await this.Model.findByIdAndUpdate(this.input.params.id, this.input.body);
    } catch (e) {
      handleMongoErrors(e);
    }
    if (result === null) {
      throw new NotFoundError();
    }
    return result;
  }

  public async delete(): Promise<any> {
    let result = null;
    try {
      result = await this.Model.findByIdAndDelete(this.input.params.id);
    } catch (e) {
      handleMongoErrors(e);
    }
    if (result === null) {
      throw new NotFoundError();
    }
    return result;
  }
}

export default ServiceBase;
