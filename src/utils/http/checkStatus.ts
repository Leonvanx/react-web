import myToast from '@/utils/toast';
export function checkStatus(status: number, msg: string): void {
  let errMessage = '';

  switch (status) {
    case 400:
      errMessage = `${msg}`;
      break;
    // 401: Not logged in
    // Jump to the login page if not logged in, and carry the path of the current page
    // Return to the current page after successful login. This step needs to be operated on the login page.
    case 401:
      errMessage = msg || '用户没有访问权限，需要进行身份认证';
      //     userStore.logout(true);
      break;
    case 403:
      errMessage = '很抱歉，您的访问请求被禁止';
      break;
    // 404请求不存在
    case 404:
      errMessage = '服务器未找到资源';
      break;
    case 500:
      errMessage = '服务器内部错误';
      break;
    case 502:
      errMessage = '网络错误';
      break;
    case 503:
      errMessage = '服务不可用';
      break;
    case 504:
      errMessage = '请求超时';
      break;
    default:
  }

  if (errMessage) {
    myToast.error(errMessage);
  }
}
