import { ResultSuccess } from '@/types/requestOptions';
export interface LoginParams {
  userEmail: string;
  userPwd: string;
}

export interface registerParams {
  userName: string;
  userPwd: string;
  userPhone?: string;
  userEmail?: string;
}

export interface User {
  userId?: number;
  userName: string;
  userPhone?: string;
  userEmail: string;
  userPwd: string;
  userAddress?: string;
  createTime?: Date;
  updateTime?: Date;
}

export interface UserInfoModel extends ResultSuccess {
  result: User;
}

export interface UserInfoList extends ResultSuccess {
  result: User[];
}
