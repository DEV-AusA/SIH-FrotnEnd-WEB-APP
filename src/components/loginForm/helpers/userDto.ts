import { IUser } from "@/helpers/types";

const userDto = (data: IUser) => {
  const Dto = {
    id: data.id,
    name: data.name,
    lastName: data.lastName,
    email: data.email,
    document: Number(data.document),
    phone: Number(data.phone),
    cellphone: Number(data.cellphone),
    rol: data.rol,
    image: data.image,
    lastLogin: data.lastLogin,
    properties: data.properties,
  };
  return Dto;
};

export default userDto;
