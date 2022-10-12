import { AxiosResponse } from 'axios';
export interface RequestOptions {
  // 是否需要返回带响应头的原生res
  isReturnOriginResponse?: boolean;
  // 是否需要返回经过Aspect处理的res
  isReturnAspectResponse?: boolean;
  // 是否需要将POST请求的参数拼接到URL
  isJoinParamsToUrl?: boolean;
  // 是否需要加入时间戳
  isJoinTime?: boolean;
  // 是否需要忽略重复请求
  isIgnoreRepeatRequest?: boolean;
  // 是否需要增加TOKEN到请求头
  isWithToken?: boolean;
}

/**
 * @description
 * 只包含code,message,result的返回结果
 */
export interface ResultSuccess<T = any> {
  code: number;
  message: string;
  result?: T;
}

/**
 * @description
 * 包含http响应头等信息的原生httpRes
 */
export interface OriginResult<T = any> extends AxiosResponse {
  data: ResultSuccess<T>;
}

export interface UploadFileParams {
  // Other parameters
  data?: any;
  // File parameter interface field name
  name?: string;
  // file name
  file: File | Blob;
  // file name
  filename?: string;
  [key: string]: any;
}
