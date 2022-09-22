import { getUserInfoApi, userLoginApi } from '@/apis/user/login';
import { userRegisterApi } from '@/apis/user/register';
import myToast from '@/utils/toast';
import { Button } from 'antd';

const Login: React.FC = () => {
  const data = { userEmail: 'test@123.com', userPwd: '123456' };
  const post = () => {
    userLoginApi(data, { isWithToken: false }).then((res) => {
      window.localStorage.setItem('token', 'Bearer ' + res.result.token);
      myToast.success(res.message);
    });
  };
  const get = () => {
    getUserInfoApi(data).then((res) => {
      console.log(res.result);
    });
  };
  const registerUser = () => {
    const userData = {
      userName: 'renzj',
      userPwd: 'renzj@test.',
      userPhone: '13707205282',
      userEmail: 'renzj@outlook.com'
    };
    userRegisterApi(userData, { isWithToken: false }).then((res) => {
      res.message && myToast.success(res.message);
      console.log(res);
    });
  };
  return (
    <>
      <Button type="primary" style={{ marginRight: '30px' }} onClick={registerUser}>
        测试POST
      </Button>
      <Button type="default" onClick={get}>
        测试GET
      </Button>
    </>
  );
};
export default Login;
