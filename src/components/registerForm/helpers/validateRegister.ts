import { IRegister } from "../../../helpers/types";

const emailRegExp = /\S+@\S+\.\S+/;
const userRegExp = /^[a-zA-Z0-9]+$/;
const passwordRegExp =
  /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*\W)(?!.*\s).{8,15}$/;

const validateRegister = ({
  name,
  lastName,
  email,
  username,
  document,
  /* phone, */
  cellphone,
  /* code, */
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
  if (!name) errors.name = "Ingresa tu nombre.";
  else if (name.trim().length < 2 || name.trim().length > 30) {
    errors.name = "Nombre invalido.";
  } else if (!lastName) {
    errors.lastName = "Ingresa tu apellido.";
  } else if (lastName.trim().length < 2 || lastName.trim().length > 30) {
    errors.lastName = "Apellido invalido.";
  } else if (!email) errors.email = "Ingresa tu correo electrónico.";
  else if (!emailRegExp.test(email)) {
    errors.email = "Correo electrónico invalido";
  } else if (!username) {
    errors.username = "Ingresa un usuario.";
  } else if (!userRegExp.test(username) || username.trim().length < 3) {
    errors.username = "Usuario invalido.";
  } else if (!document) {
    errors.document = "Ingresa tu documento.";
  } else if (document.trim().length !== 8) {
    errors.document = "Documento invalido.";
  } else if (!cellphone) errors.cellphone = "Ingresa tu telefono.";
  else if (cellphone.trim().length < 10) {
    errors.cellphone = "Numero de telefono invalido";
  } else if (!password) errors.password = "Debes ingresar una contraseña.";
  else if (!passwordRegExp.test(password))
    errors.password = "Contraseña invalida.";
  else if (confirmpassword !== password)
    errors.confirmpassword = "La contraseña no coincide.";
  /* else if (!phone) errors.phone = "Ingresa tu telefono.";
  else if (phone.trim().length < 10) {
    errors.phone = "Numero de telefono invalido";
  } else if (!code) errors.code = "Ingresa el codigo de vivienda.";
  else if (code.trim().length < 6) {
    errors.code = "Codigo de vivienda invalido";
  } */

  return errors;
};

export default validateRegister;
