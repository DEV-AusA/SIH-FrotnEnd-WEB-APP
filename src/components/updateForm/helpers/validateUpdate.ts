import { IRegister } from "../../../helpers/types";

const emailRegExp = /\S+@\S+\.\S+/;
const userRegExp = /^[a-zA-Z0-9]+$/;
const passwordRegExp =
  /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*\W)(?!.*\s).{8,15}$/;

const validateUpdate = ({
  name,
  lastName,
  email,
  username,
  document,
  phone,
  cellphone,
  password,
  confirmpassword,
}: IRegister) => {
  const errors: IRegister = {
    name: "",
    lastName: "",
    email: "",
    username: "",
    document: "",
    phone: "",
    cellphone: "",
    code: "",
    password: "",
    confirmpassword: "",
  };
  if (name && (name.trim().length < 2 || name.trim().length > 30))
    errors.name = "Nombre Invalido.";
  else if (
    lastName &&
    (lastName.trim().length < 2 || lastName.trim().length > 30)
  ) {
    errors.lastName = "Apellido invalido.";
  } else if (email && !emailRegExp.test(email))
    errors.email = "Correo electrónico invalido.";
  else if (
    username &&
    (!userRegExp.test(username) || username.trim().length < 3)
  ) {
    errors.username = "Usuario invalido.";
  } else if (document && document.trim().length !== 8) {
    errors.document = "Documento Invalido.";
  } else if (cellphone && cellphone.trim().length < 10)
    errors.cellphone = "Número de telefono invalido.";
  else if (password && !passwordRegExp.test(password))
    errors.password =
      "Almenos: una mayúscula, una minúscula, un carácter especial y un número.";
  else if (confirmpassword !== password)
    errors.confirmpassword = "La contraseña no coincide.";
  else if (phone && phone.trim().length < 10 && phone !== "0")
    errors.phone = "Número de telefono invalido.";

  return errors;
};

export default validateUpdate;
