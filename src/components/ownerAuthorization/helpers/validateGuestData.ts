import { IAuthorization } from "@/helpers/types";

const validateGuestData = ({ name, document }: IAuthorization) => {
  const errors: IAuthorization = {
    type: "",
    name: "",
    document: "",
  };
  if (!name) errors.name = "Ingresa el nombre del invitado.";
  else if (name.trim().length < 3 || name.trim().length > 30) {
    errors.name = "Nombre invalido.";
  } else if (!document) errors.document = "Ingresa el documento del invitado.";
  else if (document.trim().length !== 8) {
    errors.document = "Documento invalido.";
  }
  return errors;
};

export default validateGuestData;
