import { ICreateExp } from "@/helpers/types";

const expDto = (data: ICreateExp) => {
  const Dto = {
    id: data.id,
    description: data.description,
    amount: Number(data.amount),
  };
  return Dto;
};

export default expDto;
