import myToast from '@/utils/toast';
import { AxiosAspect, AxiosOpitions } from '#/axiosOptions';
import { RequestOptions, Result } from '#/requestOpitions';
import { ResultEnum } from '@/enums/httpEnum';
import { AxiosResponse, AxiosInstance } from 'axios';
import { AxiosCanceler } from '#/axiosdCancelToken';

const axiosAspect: AxiosAspect = {
  beforeRequestHook: (config, options) => {
    const { apiUrl, joinPrefix, joinParamsToUrl, formatDate, joinTime = true, urlPrefix } = options;

    if (joinPrefix) {
      config.url = `${urlPrefix}${config.url}`;
    }

    if (apiUrl && isString(apiUrl)) {
      config.url = `${apiUrl}${config.url}`;
    }
    const params = config.params || {};
    const data = config.data || false;
    formatDate && data && !isString(data) && formatRequestDate(data);
    if (config.method?.toUpperCase() === RequestEnum.GET) {
      if (!isString(params)) {
        // 给 get 请求加上时间戳参数，避免从缓存中拿数据。
        config.params = Object.assign(params || {}, joinTimestamp(joinTime, false));
      } else {
        // 兼容restful风格
        config.url = config.url + params + `${joinTimestamp(joinTime, true)}`;
        config.params = undefined;
      }
    } else {
      if (!isString(params)) {
        formatDate && formatRequestDate(params);
        if (Reflect.has(config, 'data') && config.data && Object.keys(config.data).length > 0) {
          config.data = data;
          config.params = params;
        } else {
          // 非GET请求如果没有提供data，则将params视为data
          config.data = params;
          config.params = undefined;
        }
        if (joinParamsToUrl) {
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
    // 是否返回原生响应头 比如：需要获取响应头时使用该属性
    if (isReturnOriginResponse) {
      return res;
    }
    // 不进行任何处理，直接返回
    // 用于页面代码可能需要直接获取code，data，message这些信息时开启
    if (!isReturnNoAspectResponse) {
      return res.data;
    }

    const { data } = res;
    if (!data) {
      /**
       * TODO
       */
      // return '[HTTP] Request has no return value';
    }
    const { code, result, message } = data;

    // 这里逻辑可以根据项目进行修改
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

    throw new Error(msg || '请求出错，请稍候重试');
  },

  requestInterceptors: (config, options) => {
    // config repeat request
    const axiosCanceler = new AxiosCanceler();
    // @ts-ignore
    const { ignoreCancelToken } = config.requestOptions;
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
  responseInterceptorsCatch: (axiosInstance: AxiosInstance, error: any) => {
    // const { t } = useI18n();
    // const errorLogStore = useErrorLogStoreWithOut();
    // errorLogStore.addAjaxErrorInfo(error);
    // const { response, code, message, config } = error || {};
    // const errorMessageMode = config?.requestOptions?.errorMessageMode || 'none';
    // const msg: string = response?.data?.error?.message ?? '';
    // const err: string = error?.toString?.() ?? '';
    // let errMessage = '';
    // try {
    //   if (code === 'ECONNABORTED' && message.indexOf('timeout') !== -1) {
    //     errMessage = t('sys.api.apiTimeoutMessage');
    //   }
    //   if (err?.includes('Network Error')) {
    //     errMessage = t('sys.api.networkExceptionMsg');
    //   }
    //   if (errMessage) {
    //     if (errorMessageMode === 'modal') {
    //       createErrorModal({ title: t('sys.api.errorTip'), content: errMessage });
    //     } else if (errorMessageMode === 'message') {
    //       createMessage.error(errMessage);
    //     }
    //     return Promise.reject(error);
    //   }
    // } catch (error) {
    //   throw new Error(error as unknown as string);
    // }
    // checkStatus(error?.response?.status, msg, errorMessageMode);
    // // 添加自动重试机制 保险起见 只针对GET请求
    // const retryRequest = new AxiosRetry();
    // const { isOpenRetry } = config.requestOptions.retryRequest;
    // config.method?.toUpperCase() === RequestEnum.GET &&
    //   isOpenRetry &&
    //   // @ts-ignore
    //   retryRequest.retry(axiosInstance, error);
    // return Promise.reject(error);
  }
};

function ceateAxios(option?: AxiosOpitions) {}

const defHttp = {};
export default defHttp;
