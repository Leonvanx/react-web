export interface User {
  userId: number;
  userName: string;
  userEmail: string;
  userPhone: string;
  userPwd: string;
  userAddress: string;
  createTime: Date;
  updateTime: Date;
}

type RegisterParams = Partial<Omit<User, 'userId' | 'userAddress' | 'createTime' | 'updateTime'>>;

type LoginParams = Partial<Omit<User, 'userId' | 'userAddress' | 'createTime' | 'updateTime'>>;

type UpdateParams = Partial<Omit<User, 'userId' | 'createTime' | 'updateTime'>>;

export { RegisterParams, LoginParams, UpdateParams };
