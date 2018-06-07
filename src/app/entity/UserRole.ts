export class UserRole {
  static readonly ADMIN_KEY = 'userRole.admin';
  static readonly NORMAL_USER_KEY = 'userRole.normalUser';

  id: number;
  name: string;
  description: string;
  translateKey?: string;

  constructor(id?: number, name?: string, description?: string, translateKey?: string = UserRole.NORMAL_USER_KEY) {
    this.id = id ? id : null;
    this.name = name ? name : null;
    this.description = description ? description : null;
    this.translateKey = translateKey;
  }
}
