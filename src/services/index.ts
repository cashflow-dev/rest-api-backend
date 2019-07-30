import { ParameterizedContext } from 'koa';
import _ from 'lodash';
import { ServiceClass } from '../interfaces/Service';
import { InputData } from '../interfaces/InputData';

export const serviceLaunch = async (Serviceclass: ServiceClass, method: string, context: ParameterizedContext): Promise<any> => {
  const nonFilterQueries = ['fields', 'limit', 'next', 'search'];
  const query = _.get(context, 'request.query', null);
  const data: InputData = {
    body: context.request.body,
    params: context.params,
    query,
    fields: _.get(query, 'fields', null),
    limit: _.get(query, 'limit', null),
    next: _.get(query, 'next', null),
    search: _.get(query, 'search', null),
    filters: _.omit(query, nonFilterQueries),
  };

  const service = new Serviceclass(data);
  if (_.has(service, 'validators') && _.has(service, `validators[${method}]`)) {
    service.validators[method](data);
  } else {
    throw new Error('No validator');
  }

  return service[method]();
};

export default serviceLaunch;

export { UserService } from './user';
export { AccountService } from './account';
