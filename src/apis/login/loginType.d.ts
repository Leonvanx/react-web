import { ResultSuccess } from '@/types/requestOptions';
export interface LoginParams {
  userEmail: string;
  userPwd: string;
}
export interface RoleInfo {
  roleName: string;
  value: string;
}

export interface GetUserInfoModel extends ResultSuccess {
  result: {
    roles: RoleInfo[];
    // 用户id
    userId: string | number;
    // 用户名
    username: string;
    // 真实名字
    realName: string;
    // 介绍
    desc?: string;
  };
}
