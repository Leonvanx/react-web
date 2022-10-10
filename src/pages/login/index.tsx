import { getUserInfoApi, getUserListApi, editUserInfo, userLoginApi, userRegisterApi } from '@/apis/user/index';
import myToast from '@/utils/toast';
import { Button } from 'antd';

const LoginPage: React.FC = () => {
  const data = { userEmail: 'xulf', userPwd: '123456' };
  const login = () => {
    userLoginApi(data, { isWithToken: false }).then((res) => {
      window.localStorage.setItem('token', 'Bearer ' + res.result.token);
      myToast.success(res.message);
    });
  };
  const queryUser = () => {
    getUserInfoApi({ userId: 100 }).then((res) => {
      console.log(res);
    });
  };
  const registerUser = () => {
    const userData = {
      userName: 'xulf',
      userPwd: 'Lvinxu520xlf.',
      userPhone: '18696247226',
      userEmail: 'lvin_xu@outlook.com'
    };
    userRegisterApi(userData, { isWithToken: false }).then((res) => {
      res.message && myToast.success(res.message);
      console.log(res);
    });
  };
  const updateUserInfo = () => {
    editUserInfo({ userAddress: '迪斯尼公园' }).then((res) => {
      console.log(res.message);
    });
  };
  return (
    <>
      <Button type="primary" style={{ marginRight: '30px' }} onClick={registerUser}>
        测试POST
      </Button>
      <Button type="default" style={{ marginRight: '30px' }} onClick={queryUser}>
        测试GET
      </Button>
      <Button type="default" onClick={login}>
        获取Token
      </Button>
    </>
  );
};
export default LoginPage;
