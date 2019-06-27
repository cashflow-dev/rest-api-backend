import { ParameterizedContext } from 'koa';
import { ServiceClass } from '../interfaces/Service';
import { InputData } from '../interfaces/InputData';

export const serviceLaunch = (Serviceclass: ServiceClass, method: string, context: ParameterizedContext): any => {
  const data: InputData = {
    body: context.request.body,
    params: context.params,
    query: context.request.query,
  };

  const service = new Serviceclass(data);
  service.validators[method]();
  return service[method]();
};

export default serviceLaunch;

export { UserService } from './user/UserService';
