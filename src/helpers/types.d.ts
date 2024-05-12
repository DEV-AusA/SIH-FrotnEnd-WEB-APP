export interface ILogin {
  user: string;
  password: string;
}
export interface IRegister {
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
export interface IUser {
  name: string;
  lastName: string;
  document: number;
  email: string;
  cellphone: number;
  phone: number;
  rol: "user" | "admin" | "security";
  image: string;
  lastLogin: string;
}
