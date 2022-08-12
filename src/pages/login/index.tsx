import { getUserInfo, loginApi } from '@/apis/login';
import { Button } from 'antd';

const Login: React.FC = () => {
  const data = { userName: 'test', userPwd: '123456' };
  const POST = () => {
    loginApi(data)
      .then((res) => {})
      .catch((e) => {
        // console.log(e);
      });
  };
  const GET = () => {
    getUserInfo(data);
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
