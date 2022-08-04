import { RequestOptions, Result, UploadFileParams } from '@/types/requestOptions';
import { AxiosOptions } from '#/axiosOptions';
import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { isFunction } from '../is';
import { ContentTypeEnum, RequestEnum } from '@/enums/httpEnum';
import qs from 'qs';

export class DefAxios {
  private axiosInstance: AxiosInstance;
  private axiosOptions: AxiosOptions;

  constructor(axiosOptions: AxiosOptions) {
    this.axiosOptions = axiosOptions;
    this.axiosInstance = axios.create(axiosOptions);
    this.setupInterceptors();
  }

  supportFormData(config: AxiosRequestConfig) {
    const headers = config.headers || this.axiosOptions.headers;
    const contentType = headers?.['Content-Type'] || headers?.['content-type'];

    if (
      contentType !== ContentTypeEnum.FORM_URLENCODED ||
      !Reflect.has(config, 'data') ||
      config.method?.toUpperCase() === RequestEnum.GET
    ) {
      return config;
    }

    return {
      ...config,
      data: qs.stringify(config.data, { arrayFormat: 'brackets' })
    };
  }
  uploadFile<T = any>(config: AxiosRequestConfig, params: UploadFileParams) {
    const formData = new window.FormData();
    const customFilename = params.name || 'file';

    if (params.filename) {
      formData.append(customFilename, params.file, params.filename);
    } else {
      formData.append(customFilename, params.file);
    }

    if (params.data) {
      Object.keys(params.data).forEach((key) => {
        const value = params.data![key];
        if (Array.isArray(value)) {
          value.forEach((item) => {
            formData.append(`${key}[]`, item);
          });
          return;
        }

        formData.append(key, params.data![key]);
      });
    }

    return this.axiosInstance.request<T>({
      ...config,
      method: 'POST',
      data: formData,
      headers: {
        'Content-type': ContentTypeEnum.FORM_DATA
      }
    });
  }

  get<T = any>(axiosReqConfig: AxiosRequestConfig, reqOptions?: RequestOptions): Promise<T> {
    return this.request({ ...axiosReqConfig, method: 'GET' }, reqOptions);
  }
  post<T = any>(axiosReqConfig: AxiosRequestConfig, reqOptions?: RequestOptions): Promise<T> {
    return this.request({ ...axiosReqConfig, method: 'POST' }, reqOptions);
  }
  delete<T = any>(axiosReqConfig: AxiosRequestConfig, reqOptions?: RequestOptions): Promise<T> {
    return this.request({ ...axiosReqConfig, method: 'DELETE' }, reqOptions);
  }
  put<T = any>(axiosReqConfig: AxiosRequestConfig, reqOptions?: RequestOptions): Promise<T> {
    return this.request({ ...axiosReqConfig, method: 'PUT' }, reqOptions);
  }
  head<T = any>(axiosReqConfig: AxiosRequestConfig, reqOptions?: RequestOptions): Promise<T> {
    return this.request({ ...axiosReqConfig, method: 'HEAD' }, reqOptions);
  }
  request<T = any>(config: AxiosRequestConfig, options?: RequestOptions): Promise<T> {
    let conf: AxiosOptions = JSON.parse(JSON.stringify(config));
    const aspect = this.getAspect();

    const { requestOptions } = this.axiosOptions;

    const mergeRequestOptions: RequestOptions = { ...requestOptions, ...options };

    const { beforeRequestHook, requestCatchHook, transformResponseHook } = aspect || {};
    if (beforeRequestHook && isFunction(beforeRequestHook)) {
      conf = beforeRequestHook(conf, mergeRequestOptions);
    }
    conf.requestOptions = mergeRequestOptions;

    conf = this.supportFormData(conf);
    return new Promise((resolve, reject) => {
      this.axiosInstance
        .request<any, AxiosResponse<Result>>(conf)
        .then((res: AxiosResponse<Result>) => {
          if (transformResponseHook && isFunction(transformResponseHook)) {
            try {
              const ret = transformResponseHook(res, mergeRequestOptions);
              resolve(ret);
            } catch (err) {
              reject(err || new Error('request error!'));
            }
            return;
          }
          resolve(res as unknown as Promise<T>);
        })
        .catch((e: Error | AxiosError) => {
          if (requestCatchHook && isFunction(requestCatchHook)) {
            reject(requestCatchHook(e, mergeRequestOptions));
            return;
          }
          if (axios.isAxiosError(e)) {
            // rewrite error message from axios in here
          }
          reject(e);
        });
    });
  }
  private getAspect() {
    const { axiosAspect } = this.axiosOptions;
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
        return requestInterceptors(config, this.axiosOptions);
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
