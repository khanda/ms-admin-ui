import {UserRole} from '../entity/UserRole';
export const USER_ROLES = [
  new UserRole(1, 'admin', 'admin', UserRole.ADMIN_KEY),
  new UserRole(2, 'user', 'normal user')
];
