import defHttp from '@/utils/http';
import { GetUserInfoModel, LoginParams } from './loginType';
import { RequestOptions, ResultSuccess } from '#/requestOptions';

const api = {
  login: '/apiProxy/user/login',
  getUserInfo: '/apiProxy/user/getUserInfo'
};

/**
 * @description: user login api
 */
export function userLoginApi(data: LoginParams, reqOptions?: RequestOptions) {
  return defHttp.post<ResultSuccess>(
    {
      url: api.login,
      data: data
    },
    reqOptions
  );
}

/**
 * @description: getUserInfo
 */
export function getUserInfoApi(params: any, reqOptions?: RequestOptions) {
  return defHttp.get<GetUserInfoModel>(
    {
      url: api.getUserInfo,
      params: params
    },
    reqOptions
  );
}
