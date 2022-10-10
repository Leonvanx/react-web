import defHttp from '@/utils/http';
import { LoginParams, registerParams, User, UserInfoList, UserInfoModel } from './user';
import { RequestOptions, ResultSuccess } from '#/requestOptions';

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
  return defHttp.post<ResultSuccess>(
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
export function userRegisterApi(data: registerParams, reqOptions?: RequestOptions) {
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
export function getUserInfoApi(params: any, reqOptions?: RequestOptions) {
  return defHttp.get<UserInfoModel>(
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
  return defHttp.get<UserInfoList>(
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
export function editUserInfo(
  params: Omit<Partial<User>, 'userId' | 'createTime' | 'updateTime'>,
  reqOptions?: RequestOptions
) {
  return defHttp.get<ResultSuccess>(
    {
      url: Api.UpdateUserInfo,
      params: params
    },
    reqOptions
  );
}
