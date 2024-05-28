import { IAuthorization } from "@/helpers/types";

const onlypositivenumbers = /^[0-9]+$/;
const onlyLetters = /^[a-zA-Z\s]+$/;
const validateGuestData = ({ name, document }: IAuthorization) => {
  const errors: IAuthorization = {
    type: "",
    name: "",
    document: "",
  };
  if (!name) errors.name = "Ingresa el nombre del invitado.";
  else if (name.trim().length < 3 || name.trim().length > 30) {
    errors.name = "Nombre invalido.";
  } else if (!onlyLetters.test(name)) {
    errors.name = "Solo se permiten letras.";
  } else if (!document) {
    errors.document = "Ingresa el documento del invitado.";
  } else if (document.trim().length !== 8) {
    errors.document = "Documento invalido.";
  } else if (!onlypositivenumbers.test(document)) {
    errors.document = "Este campo solo admite números.";
  }
  return errors;
};

export default validateGuestData;
