import { IRegister } from "../../../helpers/types";

const emailRegExp = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const userRegExp = /^[a-zA-Z0-9]+$/;
const passwordRegExp =
  /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*\W)(?!.*\s).{8,15}$/;
const onlypositivenumbers = /^[0-9]+$/;

const validateRegister = ({
  name,
  lastName,
  email,
  username,
  document,
  phone,
  cellphone,
  code,
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
  } else if (!userRegExp.test(name)) {
    errors.name = "Este campo no acepta caracteres especiales.";
  } else if (!lastName) {
    errors.lastName = "Ingresa tu apellido.";
  } else if (lastName.trim().length < 2 || lastName.trim().length > 30) {
    errors.lastName = "Apellido invalido.";
  } else if (!userRegExp.test(lastName)) {
    errors.lastName = "Este campo no acepta caracteres especiales.";
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
  } else if (!onlypositivenumbers.test(document)) {
    errors.document = "Este campo solo admite números.";
  } else if (!cellphone) errors.cellphone = "Ingresa tu telefono.";
  else if (cellphone.trim().length < 10) {
    errors.cellphone = "Numero de telefono invalido";
  } else if (!onlypositivenumbers.test(cellphone)) {
    errors.cellphone = "Este campo solo admite números.";
  } else if (!password) errors.password = "Debes ingresar una contraseña.";
  else if (!passwordRegExp.test(password))
    errors.password =
      "Almenos: una mayúscula, una minúscula, un carácter especial y un número.";
  else if (confirmpassword !== password)
    errors.confirmpassword = "La contraseña no coincide.";
  else if (phone && phone.trim().length < 10) {
    errors.phone = "Numero de telefono invalido";
  } else if (phone && !onlypositivenumbers.test(phone)) {
    errors.phone = "Este campo solo admite números.";
  } else if (!code) errors.code = "Ingresa el codigo de vivienda.";
  else if (code.trim().length < 6) {
    errors.code = "Codigo de vivienda invalido";
  }

  return errors;
};

export default validateRegister;
