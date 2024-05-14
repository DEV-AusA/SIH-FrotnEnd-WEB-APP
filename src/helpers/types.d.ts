export interface ILogin {
  user: string;
  password: string;
}
export interface IRegister {
  file?: string;
  name: string;
  lastName: string;
  email: string;
  username: string;
  document: string;
  phone: string;
  cellphone: string;
  code: string;
  password: string;
  confirmpassword?: string;
}
export interface IUpdate {
  file?: string;
  name?: string;
  lastName?: string;
  email?: string;
  username?: string;
  document?: number;
  phone?: number;
  cellphone?: number;
  code?: string;
  password?: string;
  confirmpassword?: string;
}
export interface IUser {
  id: string;
  name: string;
  lastName: string;
  document: number;
  email: string;
  cellphone: number;
  phone: number;
  rol:
    | "superadmin"
    | "admin"
    | "security"
    | "owner"
    | "security"
    | "googletemp";
  image: string;
  lastLogin: string;
}
