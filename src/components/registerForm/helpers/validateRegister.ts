import { IRegister } from "../../../helpers/types";

const emailRegExp = /\S+@\S+\.\S+/;

const validateRegister = ({
  name,
  lastName,
  email,
  username,
  dni,
  phone,
  houseCode,
  password,
  confirmpassword,
}: IRegister) => {
  const errors: IRegister = {
    name: "",
    lastName: "",
    email: "",
    username: "",
    dni: "",
    phone: "",
    houseCode: "",
    password: "",
    confirmpassword: "",
  };
  if (!name) errors.name = "Ingresa tu nombre.";
  else if (name.trim().length < 5) {
    errors.name = "Nombre debe tener al menos 5 caracteres.";
  } else if (!lastName) {
    errors.lastName = "Ingresa tu apellido.";
  } else if (lastName.trim().length < 5) {
    errors.lastName = "Apellido debe tener al menos 5 caracteres.";
  } else if (!email) errors.email = "Ingresa tu correo electronico.";
  else if (!emailRegExp.test(email)) {
    errors.email = "Correo Electronico Invalido";
  } else if (!username) {
    errors.username = "Ingresa un usuario.";
  } else if (username.trim().length < 5) {
    errors.username = "El usuario debe tener al menos 5 caracteres.";
  } else if (!dni) {
    errors.dni = "Ingresa tu documento.";
  } else if (dni.trim().length < 5) {
    errors.dni = "Documento invalido.";
  } else if (!phone) errors.phone = "Ingresa tu telefono.";
  else if (phone.trim().length < 10) {
    errors.phone = "Numero de telefono invalido";
  } else if (!houseCode) errors.houseCode = "Ingresa el codigo de vivienda.";
  else if (houseCode.trim().length < 6) {
    errors.houseCode = "Codigo de vivienda invalido";
  } else if (!password) errors.password = "Debes ingresar una contraseña.";
  else if (password.trim().length < 5) {
    errors.password = "La contraseña debe tener almenos 5 caracteres.";
  } else if (confirmpassword !== password)
    errors.confirmpassword = "La contraseña no coincide.";

  return errors;
};

export default validateRegister;
