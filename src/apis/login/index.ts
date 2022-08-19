import defHttp from '@/utils/http';
import { GetUserInfoModel, LoginParams } from './loginType';
import { RequestOptions, ResultSuccess } from '#/requestOptions';

const Api = {
  Login: '/apiProxy/user/login',
  GetUserInfo: '/apiProxy/user/getUserInfo'
};

/**
 * @description: user login api
 */
export function loginApi(data: LoginParams, reqOptions?: RequestOptions) {
  return defHttp.post<ResultSuccess>(
    {
      url: Api.Login,
      data: data
    },
    reqOptions
  );
}

/**
 * @description: getUserInfo
 */
export function getUserInfo(params: any, reqOptions?: RequestOptions) {
  return defHttp.get<GetUserInfoModel>(
    {
      url: Api.GetUserInfo,
      params: params
    },
    reqOptions
  );
}
