import { getUserInfo, loginApi } from '@/apis/login';
import myToast from '@/utils/toast';
import { Button } from 'antd';

const Login: React.FC = () => {
  const data = { userEmail: 'test@123.com', userPwd: '123456' };
  const POST = () => {
    loginApi(data, { isWithToken: false }).then((res) => {
      window.localStorage.setItem('token', 'Bearer ' + res.result.token);
      myToast.success(res.message);
    });
  };
  const GET = () => {
    getUserInfo(data, { isWithToken: false })
      .then((res) => {})
      .catch((e) => {});
  };
  return (
    <>
      <Button type="primary" style={{ marginRight: '30px' }} onClick={POST}>
        测试POST
      </Button>
      <Button type="default" onClick={GET}>
        测试GET
      </Button>
    </>
  );
};
export default Login;
