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
      errMessage = '';
      break;
    case 405:
      errMessage = '';
      break;
    case 408:
      errMessage = '';
      break;
    case 500:
      errMessage = '';
      break;
    case 501:
      errMessage = '服务器错误,请联系管理员!';
      break;
    case 502:
      errMessage = '';
      break;
    case 503:
      errMessage = '';
      break;
    case 504:
      errMessage = '';
      break;
    case 505:
      errMessage = '';
      break;
    default:
  }

  if (errMessage) {
    if (errorMessageMode === 'modal') {
      createErrorModal({ title: t('sys.api.errorTip'), content: errMessage });
    } else if (errorMessageMode === 'message') {
      error({ content: errMessage, key: `global_error_message_status_${status}` });
    }
  }
}
