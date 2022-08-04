import { loginApi } from '@/apis/login';
import { Button } from 'antd';

const Login: React.FC = () => {
  const Login = () => {
    console.log('post');
    loginApi({ userName: 'test', userPwd: '123456' });
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
