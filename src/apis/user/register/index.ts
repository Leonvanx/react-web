import defHttp from '@/utils/http';
import { registerParams } from './registerType.d';
import { RequestOptions, ResultSuccess } from '#/requestOptions';

const Api = {
  Register: '/apiProxy/user/register'
};

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
