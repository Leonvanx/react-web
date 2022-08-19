import { getUserInfo, loginApi } from '@/apis/login';
import { Button } from 'antd';

const Login: React.FC = () => {
  const data = { userEmail: 'test@123.com', userPwd: '123456' };
  const POST = () => {
    loginApi(data)
      .then((res) => {
        console.log(res);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const GET = () => {
    getUserInfo(data)
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
