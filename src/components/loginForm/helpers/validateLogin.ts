import { ILogin } from "../../../helpers/types";

const emailRegExp = /\S+@\S+\.\S+/;

const validateLogin = ({ email, password }: ILogin) => {
  const errors: ILogin = {
    email: "",
    password: "",
  };

  if (!email) errors.email = "Debes ingresar un correo.";
  else if (!emailRegExp.test(email)) {
    errors.email = "Correo invalido.";
  } else if (!password) errors.password = "Debes ingresar tu contraseña.";
  else if (password.length < 5) {
    errors.password = "Las contraseñas tienen almenos 5 caracteres.";
  }

  return errors;
};

export default validateLogin;
