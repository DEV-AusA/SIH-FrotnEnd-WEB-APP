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
  username?: string;
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
  state?: boolean;
  createdAt?: string;
  properties: [IProperty];
}
export interface IPropUser {
  lastName: string;
  name: string;
  state: boolean;
}
export interface IProperty {
  address: string;
  code: string;
  id: string;
  image: string;
  number: number;
  user: null | IPropUser;
}
export interface ICreateProperty {
  address: string;
  number: string;
}
export interface IExpense {
  amount: number;
  dateGenerated: string;
  datePaid?: string;
  id: string;
  numberOperation?: string;
  state: boolean;
  description: string;
  userProperty: string;
  property: {
    number: number;
    address: string;
    user: { name: string; lastName: string };
  };
}
export interface IPropertyExpenses {
  expences: IExpense[];
}
export interface IAuthorization {
  type: string;
  name?: string;
  document?: string;
  shipmentNumber?: string;
}
export interface IAuthorizationCreated {
  id: string;
  type: string;
  name?: string;
  document?: string;
  shipmentNumber?: string;
  accessCode: number;
  expirationTime: string;
  number: number;
  dateUsed: string;
  numberProp: number;
  addressProp: string;
  lastNameProp: string;
  nameProp: string;
}
export interface CustomError extends Error {
  response?: {
    data?: {
      message?: string;
    };
  };
}
export interface ICreateExp {
  id: string;
  description: string;
  amount: number;
}
export interface Message {
  userIdFrom: string;
  name: string;
  lastName: string;
  message: string;
  roomIdChat: string;
  userIdTo: string;
  imageTo: string;
  lastLogin: string;
}

export interface User {
  id: string;
  name: string;
  lastName: string;
  image: string;
  lastLogin: string;
}
export interface OwnerExpense {
  name: string;
  lastName: string;
  email: string;
}
