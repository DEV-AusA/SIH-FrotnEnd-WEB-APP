import { IAuthorization } from "@/helpers/types";

const userRegExp = /^[a-zA-Z0-9]+$/;
const nameRegExp = /^[a-zA-Z0-9 ]+$/;

const validatePackageData = ({ name, shipmentNumber }: IAuthorization) => {
  const errors: IAuthorization = {
    type: "",
    name: "",
    shipmentNumber: "",
  };
  if (!name) errors.name = "Ingresa el nombre de la empresa que entrega.";
  else if (name.trim().length < 3 || name.trim().length > 30) {
    errors.name = "Nombre invalido.";
  } else if (!nameRegExp.test(name)) {
    errors.name = "No se aceptan caracteres especiales.";
  } else if (!shipmentNumber)
    errors.shipmentNumber = "Ingresa información del envio.";
  else if (!userRegExp.test(shipmentNumber)) {
    errors.shipmentNumber = "No se aceptan caracteres especiales.";
  }
  return errors;
};

export default validatePackageData;
