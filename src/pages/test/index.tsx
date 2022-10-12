import { getUserInfoApi, getUserListApi, editUserInfo, userLoginApi, userRegisterApi } from '@/apis/user/index';
import myToast from '@/utils/toast';
import { Button } from 'antd';

const TestPage: React.FC = () => {
  const data = { userEmail: 'lvin_xu@outlook.com', userPwd: '123456' };
  const login = () => {
    userLoginApi(data, { isWithToken: false, isReturnOriginResponse: true }).then((res) => {
      window.localStorage.setItem('token', 'Bearer ' + res.headers.authorization);
      myToast.success(res.data.message);
    });
  };
  const queryUser = () => {
    getUserInfoApi({ userId: 118 }).then((res) => {
      console.log(res);
    });
  };
  const queryUserList = () => {
    getUserListApi({}).then((res) => {
      console.log(res);
    });
  };
  const registerUser = () => {
    const userData = {
      userName: 'renzj',
      userPwd: 'renzj@2022.',
      userPhone: '13890238011',
      userEmail: 'renzj@qq.com'
    };
    userRegisterApi(userData, { isWithToken: false }).then((res) => {
      res.code === 1 && res.message && myToast.success(res.message);
      console.log(res);
    });
  };
  const updateUserInfo = () => {
    editUserInfo({ userAddress: '柳州市柳北区', userPhone: '13707205283' }).then((res) => {
      console.log(res);
    });
  };
  return (
    <>
      <Button type="primary" style={{ marginRight: '30px' }} onClick={registerUser}>
        注册
      </Button>
      <Button type="default" style={{ marginRight: '30px' }} onClick={queryUserList}>
        查询列表
      </Button>
      <Button type="default" style={{ marginRight: '30px' }} onClick={updateUserInfo}>
        修改
      </Button>
      <Button type="default" onClick={login}>
        登陆
      </Button>
    </>
  );
};
export default TestPage;
