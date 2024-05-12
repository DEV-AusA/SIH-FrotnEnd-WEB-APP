import { IRegister } from "@/helpers/types";

const registerDto = (data: IRegister) => {
  const Dto = {
    name: data.name,
    lastName: data.lastName,
    email: data.email,
    username: data.username,
    document: Number(data.document),
    phone: Number(data.phone),
    cellphone: Number(data.cellphone),
    code: data.code,
    password: data.password,
  };
  return Dto;
};

export default registerDto;
