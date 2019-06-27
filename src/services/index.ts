import { ParameterizedContext } from 'koa';
import { ServiceClass, Service } from '../interfaces/Service';

export const serviceLaunch = (Serviceclass: ServiceClass, context: ParameterizedContext): Service => {
  const data = {
    body: context.request.body,
    params: context.params,
    query: context.request.query,
  };

  const service = new Serviceclass(data);
  service.validator.validate();
  return service;
};

export default serviceLaunch;
