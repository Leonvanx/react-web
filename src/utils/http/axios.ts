import { AxiosOpitions } from '#/axiosOptions';
import { AxiosCanceler } from '#/axiosdCancelToken';
import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { isFunction } from '@/utils/is';

export class DefAxios {
  private axiosInstance: AxiosInstance;
  private axiosOpitions: AxiosOpitions;

  constructor(axiosOpt: AxiosOpitions) {
    this.axiosOpitions = axiosOpt;
    this.axiosInstance = axios.create(axiosOpt);
    this.setupInterceptors();
  }

  private getAspect() {
    const { axiosAspect } = this.axiosOpitions;
    return axiosAspect;
  }

  private setupInterceptors() {
    const aspect = this.getAspect();
    if (!aspect) {
      return;
    }
    const { requestInterceptors, requestInterceptorsCatch, responseInterceptors, responseInterceptorsCatch } = aspect;

    const axiosCanceler = new AxiosCanceler();

    // Request interceptor configuration processing
    // this.axiosInstance.interceptors.request.use((config: AxiosOpitions) => {
    //   // If cancel repeat request is turned on, then cancel repeat request is prohibited
    //   const { ignoreCancelToken } = config.requestOptions!;
    //   const ignoreCancel =
    //     ignoreCancelToken !== undefined ? ignoreCancelToken : this.axiosOpitions.requestOptions?.ignoreCancelToken;

    //   !ignoreCancel && axiosCanceler.addPending(config);
    //   let M_config = null;
    //   if (requestInterceptors && isFunction(requestInterceptors)) {
    //     M_config = requestInterceptors(config, this.axiosOpitions);
    //   }
    //   return M_config;
    // }, undefined);

    // Request interceptor processing
    requestInterceptors &&
      isFunction(requestInterceptors) &&
      this.axiosInstance.interceptors.request.use((config) => {
        return requestInterceptors(config, this.axiosOpitions);
      }, undefined);

    // Request interceptor error capture
    requestInterceptorsCatch &&
      isFunction(requestInterceptorsCatch) &&
      this.axiosInstance.interceptors.request.use(undefined, (error) => {
        return requestInterceptorsCatch(error);
      });

    // Response result interceptor processing
    // this.axiosInstance.interceptors.response.use((res: AxiosResponse<any>) => {
    //   res && axiosCanceler.removePending(res.config);
    //   let M_res = null;
    //   if (responseInterceptors && isFunction(responseInterceptors)) {
    //     M_res = responseInterceptors(res);
    //   }
    //   return M_res;
    // }, undefined);

    // Response result interceptor processing
    responseInterceptors &&
      isFunction(responseInterceptors) &&
      this.axiosInstance.interceptors.response.use((res: AxiosResponse<any>) => {
        return responseInterceptors(res);
      });

    // Response result interceptor error capture
    responseInterceptorsCatch &&
      isFunction(responseInterceptorsCatch) &&
      this.axiosInstance.interceptors.response.use(undefined, (error) => {
        return responseInterceptorsCatch(this.axiosInstance, error);
      });
  }
}
