import { ParameterizedContext } from 'koa';
import _ from 'lodash';
import { ServiceClass } from '../interfaces/Service';
import { InputData } from '../interfaces/InputData';

export const serviceLaunch = async (Serviceclass: ServiceClass, method: string, context: ParameterizedContext): Promise<any> => {
  const data: InputData = {
    body: context.request.body,
    params: context.params,
    query: context.request.query,
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
