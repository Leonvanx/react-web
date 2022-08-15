export interface RequestOptions {
  // 是否需要返回带响应头的原生res
  isReturnOriginResponse?: boolean;
  // 是否需要返回不经过Aspect处理的res
  isReturnNoAspectResponse?: boolean;
  // 是否需要将POST请求的参数拼接到URL
  isJoinParamsToUrl?: boolean;
  // 是否需要加入时间戳
  isJoinTime?: boolean;
  // 是否需要忽略重复请求
  isIgnoreRepeatRequest?: boolean;
  // 是否需要增加TOKEN到请求头
  isWithToken?: boolean;
}

export interface ResultSuccess<T = any> {
  code: number;
  message: string;
  result: T;
}
export interface ResultError<T = any> {
  code: number;
  message: string;
  result?: T;
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
