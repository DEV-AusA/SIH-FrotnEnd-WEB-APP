import { ILogin } from "../../../helpers/types";

const validateLogin = ({ user, password }: ILogin) => {
  const errors: ILogin = {
    user: "",
    password: "",
  };

  if (!user) errors.user = "Debes ingresar tu usuario.";
  else if (user.trim().length < 3 || user.trim().length > 50) {
    errors.user = "Usuario invalido.";
  } else if (!password) errors.password = "Debes ingresar tu contraseña.";
  else if (password.length < 8 || password.length > 15) {
    errors.password = "Las contraseñas tienen entre 8 y 15 caracteres.";
  }

  return errors;
};

export default validateLogin;
