import defHttp from '@/utils/http';
import { GetUserInfoModel, LoginParams, LoginResultModel } from './loginType';

const Api = {
  Login: '/login',
  GetUserInfo: '/getUserInfo'
};

/**
 * @description: user login api
 */
export function loginApi(data: LoginParams) {
  return defHttp.post<LoginResultModel>({
    url: Api.Login,
    data: data
  });
}

/**
 * @description: getUserInfo
 */
export function getUserInfo() {
  return defHttp.get<GetUserInfoModel>({ url: Api.GetUserInfo });
}
