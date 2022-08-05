import defHttp from '@/utils/http';
import { GetUserInfoModel, LoginParams, LoginResultModel } from './loginType';
import { RequestOptions } from '#/requestOptions';

const Api = {
  Login: '/login',
  GetUserInfo: '/getUserInfo'
};

/**
 * @description: user login api
 */
export function loginApi(data: LoginParams, reqOptions?: RequestOptions) {
  return defHttp.post<LoginResultModel>(
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
export function getUserInfo() {
  return defHttp.get<GetUserInfoModel>({ url: Api.GetUserInfo });
}
