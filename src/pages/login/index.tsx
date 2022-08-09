import { loginApi } from '@/apis/login';
import { Button } from 'antd';

const Login: React.FC = () => {
  const data = { userName: 'test', userPwd: '123456' };
  const Login = () => {
    loginApi(data)
      .then((res) => {
        console.log('res', res);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  return (
    <>
      <Button type="primary" style={{ marginRight: '30px' }} onClick={Login}>
        测试POST
      </Button>
      <Button type="default">测试GET</Button>
    </>
  );
};
export default Login;
