import { ParameterizedContext } from 'koa';
import { UserService , serviceLaunch } from '../services';


export const create = async (context: ParameterizedContext): Promise<void> => {
  serviceLaunch(UserService, 'create', context);
};

export const find = async (context: ParameterizedContext): Promise<void> => {
  serviceLaunch(UserService, 'find', context);
};

export const findById = async (context: ParameterizedContext): Promise<void> => {
  serviceLaunch(UserService, 'findById', context);
};

export const update = async (context: ParameterizedContext): Promise<void> => {
  serviceLaunch(UserService, 'update', context);
};

export const deleteById = async (context: ParameterizedContext): Promise<void> => {
  serviceLaunch(UserService, 'deleteById', context);
};
