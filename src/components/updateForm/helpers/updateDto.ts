import { IRegister, IUpdate } from "@/helpers/types";

const updateDto = (data: IRegister) => {
  const Dto: IUpdate = {};
  if (data.file) Dto.file = data.file;
  if (data.name) Dto.name = data.name;
  if (data.lastName) Dto.lastName = data.lastName;
  if (data.email) Dto.email = data.email;
  if (data.username) Dto.username = data.username;
  if (data.document) Dto.document = Number(data.document);
  if (data.phone) Dto.phone = Number(data.phone);
  if (data.cellphone) Dto.cellphone = Number(data.cellphone);
  if (data.password) Dto.password = data.password;

  return Dto;
};

export default updateDto;
