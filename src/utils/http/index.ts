import { DefAxios } from './axios';
import myToast from '@/utils/toast';
import { AxiosAspect, AxiosOptions } from '#/axiosOptions';
import { RequestOptions, Result } from '@/types/requestOptions';
import { AxiosCanceler } from '@/utils/http/axiosdCancelToken';
import { ContentTypeEnum, RequestEnum, ResultEnum } from '@/enums/httpEnum';
import { AxiosResponse, AxiosInstance, AxiosRequestConfig } from 'axios';
import { isString } from '../is';
import { checkStatus } from './checkStatus';
import { joinTimestamp, setObjToUrlParams, deepMerge } from '..';

const axiosAspect: AxiosAspect = {
  beforeRequestHook: (config: AxiosRequestConfig, options: RequestOptions) => {
    const { isJoinParamsToUrl, joinTime } = options;

    const params = config.params || {};
    const data = config.data || false;

    if (config.method?.toUpperCase() === RequestEnum.GET) {
      if (!isString(params)) {
        // 给 get 请求加上时间戳参数，避免从缓存中拿数据。
        config.params = Object.assign(params || {}, joinTimestamp(joinTime!, false));
      } else {
        // 兼容restful风格
        config.url = config.url + params + `${joinTimestamp(joinTime!, true)}`;
        config.params = undefined;
      }
    } else {
      if (!isString(params)) {
        if (Reflect.has(config, 'data') && config.data && Object.keys(config.data).length > 0) {
          config.data = data;
          config.params = params;
        } else {
          // 非GET请求如果没有提供data，则将params视为data
          config.data = params;
          config.params = undefined;
        }
        if (isJoinParamsToUrl) {
          config.url = setObjToUrlParams(config.url as string, { ...config.params, ...config.data });
        }
      } else {
        // 兼容restful风格
        config.url = config.url + params;
        config.params = undefined;
      }
    }
    return config;
  },

  transformResponseHook: (res: AxiosResponse<Result>, options: RequestOptions) => {
    const { isReturnOriginResponse, isReturnNoAspectResponse } = options;
    if (res) {
      // 是否返回原生响应头 比如：需要获取响应头时使用该属性
      if (isReturnOriginResponse) {
        return res;
      }
      // 不进行任何处理，直接返回
      // 用于页面代码可能需要直接获取code，data，message这些信息时开启
      if (isReturnNoAspectResponse) {
        return res.data;
      }

      // eslint-disable-next-line no-debugger
      const { data } = res;
      if (!data) {
        throw new Error('请求出错，请稍候重试');
        /**
         * TODO
         */
        // return '[HTTP] Request has no return value';
      }
      const { code, result, message } = data;

      const hasSuccess = data && Reflect.has(data, 'code') && code === ResultEnum.SUCCESS;
      if (hasSuccess) {
        return result;
      }

      // 如果不希望中断当前请求，请return数据，否则直接抛出异常即可
      let msg = '';
      switch (code) {
        case ResultEnum.TIMEOUT:
          msg = '接口请求超时,请刷新页面重试';
          /**
           * TODO
           */
          myToast.error(msg);
          break;
        default:
          if (message) {
            msg = message;
            myToast.error(msg);
          }
      }
    }
  },

  requestInterceptors: (config: AxiosRequestConfig, options: AxiosOptions) => {
    // config repeat request
    const axiosCanceler = new AxiosCanceler();
    const { ignoreCancelToken } = options.requestOptions!;
    const ignoreCancel =
      ignoreCancelToken !== undefined ? ignoreCancelToken : options.requestOptions?.ignoreCancelToken;
    !ignoreCancel && axiosCanceler.addPending(config);

    // config token
    // const token = getToken();
    // if (token && (config as Recordable)?.requestOptions?.withToken !== false) {
    //   // jwt token
    //   (config as Recordable).headers.Authorization = options.authenticationScheme
    //     ? `${options.authenticationScheme} ${token}`
    //     : token;
    // }
    return config;
  },

  responseInterceptors: (res: AxiosResponse<any>) => {
    return res;
  },

  requestInterceptorsCatch: (error: Error) => {
    if (error) throw new Error(error.message);
  },

  responseInterceptorsCatch: (axiosInstance: AxiosInstance, error: any) => {
    const { response, code, message } = error || {};
    const msg: string = response?.data?.error?.message ?? '';
    const err: string = error?.toString?.() ?? '';
    let errMessage = '';

    // socket请求错误
    try {
      if (code === 'ECONNABORTED' && message.indexOf('timeout') !== -1) {
        errMessage = '接口请求超时,请刷新页面重试!';
        myToast.error(errMessage);
      }
      if (err?.includes('Network Error')) {
        errMessage = '网络异常，请检查您的网络连接是否正常!';
        myToast.error(errMessage);
      }
    } catch (error) {
      throw new Error(error as unknown as string);
    }

    // http请求错误
    // eslint-disable-next-line no-debugger
    checkStatus(error?.response?.status, msg);
  }
};

function ceateAxios(option?: AxiosOptions) {
  return new DefAxios(
    deepMerge(
      {
        timeout: 10 * 1000,
        headers: { 'Content-Type': ContentTypeEnum.JSON },
        axiosAspect: axiosAspect,
        requestOptions: {
          isReturnOriginResponse: false,
          // 是否需要返回不经过Aspect处理的res
          isReturnNoAspectResponse: false,
          // 是否需要将POST请求的参数拼接到URL
          isJoinParamsToUrl: false,
          // 是否需要加入时间戳
          joinTime: true,
          // 是否需要忽略重复请求
          ignoreCancelToken: true,
          // 是否需要增加TOKEN到请求头
          withToken: true
        }
      },
      option || {}
    )
  );
}

const defHttp = ceateAxios();
export default defHttp;
