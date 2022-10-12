import defHttp from '@/utils/http';
import { LoginParams, RegisterParams, UpdateParams, User } from './user';
import { RequestOptions, ResultSuccess, OriginResult } from '#/requestOptions';

const Api = {
  Login: '/apiProxy/user/login',
  Register: '/apiProxy/user/register',
  GetUserInfo: '/apiProxy/user/getUserInfo',
  GetUserList: '/apiProxy/user/getUserList',
  UpdateUserInfo: '/apiProxy/user/updateUserInfo'
};

/**
 * @description: user login api
 */
export function userLoginApi(data: LoginParams, reqOptions?: RequestOptions) {
  return defHttp.post<OriginResult>(
    {
      url: Api.Login,
      data: data
    },
    reqOptions
  );
}
/**
 * @description: register user api
 */
export function userRegisterApi(data: RegisterParams, reqOptions?: RequestOptions) {
  return defHttp.post<ResultSuccess>(
    {
      url: Api.Register,
      data: data
    },
    reqOptions
  );
}
/**
 * @description: get user info
 */
export function getUserInfoApi(params: { userId: number }, reqOptions?: RequestOptions) {
  return defHttp.get<ResultSuccess<User>>(
    {
      url: Api.GetUserInfo,
      params: params
    },
    reqOptions
  );
}
/**
 * @description: get user list
 */
export function getUserListApi(params: any, reqOptions?: RequestOptions) {
  return defHttp.get<ResultSuccess<User[]>>(
    {
      url: Api.GetUserList,
      params: params
    },
    reqOptions
  );
}
/**
 * @description: edit user info
 */
export function editUserInfo(params: UpdateParams, reqOptions?: RequestOptions) {
  return defHttp.post<ResultSuccess>(
    {
      url: Api.UpdateUserInfo,
      params: params
    },
    reqOptions
  );
}
