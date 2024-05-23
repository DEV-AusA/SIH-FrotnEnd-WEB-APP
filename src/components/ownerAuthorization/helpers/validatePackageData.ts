import { IAuthorization } from "@/helpers/types";

const validatePackageData = ({ name }: IAuthorization) => {
  const errors: IAuthorization = {
    type: "",
    name: "",
    shipmentNumber: "",
  };
  if (!name) errors.name = "Ingresa el nombre de la empresa que entrega.";
  else if (name.trim().length < 3 || name.trim().length > 30) {
    errors.name = "Nombre invalido.";
  }
  return errors;
};

export default validatePackageData;
