import { ICreateProperty } from "@/helpers/types";

const createDto = (data: ICreateProperty) => {
  const Dto = {
    address: data.address,
    number: data.number,
  };
  return Dto;
};

export default createDto;
