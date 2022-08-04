export interface LoginParams {
  userName: string;
  userPwd: string;
}
export interface RoleInfo {
  roleName: string;
  value: string;
}
export interface LoginResultModel {
  userId: string | number;
  userRole: RoleInfo;
}
export interface GetUserInfoModel {
  roles: RoleInfo[];
  // 用户id
  userId: string | number;
  // 用户名
  username: string;
  // 真实名字
  realName: string;
  // 介绍
  desc?: string;
}
