/* eslint-disable no-unused-vars */
import type { RequestOptions, Result } from '#/requestOpitions';
import { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

export interface AxiosOpitions extends AxiosRequestConfig {
  axiosAspect?: AxiosAspect;
  requestOptions?: RequestOptions;
}

export abstract class AxiosAspect {
  /**
   * @description: 处理请求前的params、data、url...
   */
  beforeRequestHook?: (config: AxiosRequestConfig, options: RequestOptions) => AxiosRequestConfig;

  /**
   * @description: 处理响应数据
   */
  transformResponseHook?: (res: AxiosResponse<Result>, options: RequestOptions) => any;

  /**
   * @description: 请求之前的拦截器
   */
  requestInterceptors?: (config: AxiosRequestConfig, options: AxiosOpitions) => AxiosRequestConfig;

  /**
   * @description: 请求之后的拦截器
   */
  responseInterceptors?: (res: AxiosResponse<any>) => AxiosResponse<any>;

  /**
   * @description: 请求之前的拦截器错误处理
   */
  requestInterceptorsCatch?: (e: Error) => void;

  /**
   * @description: 请求之后的拦截器错误处理
   */
  responseInterceptorsCatch?: (axiosInstance: AxiosInstance, e: Error) => void;

  /**
   * @description: 请求失败处理
   */
  requestCatchHook?: (e: Error, options: RequestOptions) => Promise<any>;
}
