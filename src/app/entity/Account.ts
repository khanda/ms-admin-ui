import {UserRole} from './UserRole';

export class Account {
  id: number;
  userName: string;
  email?: string;
  password: string;
  role: string;
  roleId?: number;
  userRole: UserRole;
  createBy: string;
  updateBy: string;
  createDate: Date;
  updateDate: Date;
  status: number;
}
