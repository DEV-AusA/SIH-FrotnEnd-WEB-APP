import { ICreateProperty } from "@/helpers/types";

const validateCreate = ({ address, number }: ICreateProperty) => {
  const errors = {
    address: "",
    number: "",
  };
  if (!address) {
    errors.address = "Ingresa la dirección.";
  } else if (!number) {
    errors.number = "Ingresa el número de la propiedad";
  }

  return errors;
};

export default validateCreate;
