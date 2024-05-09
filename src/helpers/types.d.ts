export interface ILogin {
  email: string;
  password: string;
}
export interface IRegister {
  name: string;
  lastName: string;
  email: string;
  username: string;
  dni: string;
  phone: string;
  houseCode: string;
  password: string;
  confirmpassword?: string;
}
