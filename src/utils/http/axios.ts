import { AxiosOpitions } from '#/axiosOptions';
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
