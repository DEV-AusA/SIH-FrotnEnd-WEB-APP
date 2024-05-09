export interface ILogin {
  user: string;
  password: string;
}
export interface IRegister {
  name: string;
  lastName: string;
  email: string;
  user: string;
  document: string;
  phone: string;
  cellphone: string;
  code: string;
  password: string;
  confirmpassword?: string;
}