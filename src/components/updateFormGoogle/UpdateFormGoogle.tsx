"use client";

import { ChangeEvent, FormEvent, useState, useEffect } from "react";
import { IRegister } from "@/helpers/types";
import validateUpdate from "./helpers/validateUpdate";
import { formData } from "./helpers/updateFormData";
import { useUserContext } from "../UserProvider";
import axios from "axios";
import Image from "next/image";
import updateDto from "./helpers/updateDto";
import Swal from "sweetalert2";

const REGISTERUSER_URL = process.env.NEXT_PUBLIC_API_URL;

const UpdateFormGoogle: React.FC = (): React.ReactElement => {
  const { user, setUser, token, setToken } = useUserContext();
  useEffect(() => {
    const checkToken = async () => {
      const storedToken = await localStorage.getItem("token");
      setToken(storedToken);
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        const currentUser = JSON.parse(storedUser);
        setUser(currentUser);
      }
    };

    checkToken();
  }, []);
  const initialState: IRegister = {
    name: user ? user.name : "",
    lastName: user ? user.lastName : "",
    email: user ? user.email : "",
    username: "",
    document: user ? String(user.document) : "",
    phone: user ? String(user.phone) : "",
    cellphone: user ? String(user.cellphone) : "",
    code: "",
    password: "",
    confirmpassword: "",
  };
  const initialStateErrors: IRegister = {
    name: "",
    lastName: "",
    email: "",
    username: "",
    document: "",
    phone: "",
    cellphone: "",
    code: "Ingresa el código de vivienda.",
    password: "",
    confirmpassword: "",
  };
  const [data, setData] = useState(initialState);
  const [errors, setErrors] = useState(initialStateErrors);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    setData({ ...data, [name]: value });

    setErrors(validateUpdate({ ...data, [name]: value }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const newdata = updateDto(data);
    axios
      .put(`${REGISTERUSER_URL}/users/update/google/${user?.id}`, newdata, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Se han actulizado tus datos.",
          showConfirmButton: true,
        }).then(() => {
          window.location.replace(`${REGISTERUSER_URL}/auth/google/login`);
        });
      })
      .catch((error) => {
        console.log(error);
        Swal.fire({
          icon: "error",
          title: "Lo sentimos, algo ha salido mal.",
          text: error.response.data.message || error.message,
          showConfirmButton: true,
        });
      });
  };

  return (
    <div className="w-full flex flex-col items-center py-10 ">
      <h2 className="text-[#384B59] text-4xl font-bold text-center px-8 max-md:text-[20px]">
        Ya casi terminamos de registrar tu cuenta!
      </h2>
      <form onSubmit={handleSubmit} className="flex flex-col items-center">
        <div className="flex flex-col justify-center items-center">
          <div className="flex flex-row justify-center items-center max-md:flex-col m-5">
            {user ? (
              <Image
                className="rounded-full border-8 border-white h-[260px] w-[260px] max-md:h-[173px] max-md:w-[173px] max-cellphone:h-[100px] max-cellphone:w-[100px]"
                src={user.image}
                height={260}
                width={260}
                alt="Imagen del usuario"
              ></Image>
            ) : (
              ""
            )}
          </div>
          <h2 className="text-[#384B59] text-4xl font-bold text-center px-8 max-md:text-[20px] m-3">
            Tus datos
          </h2>
          <div className="flex flex-col text-xl m-3">
            <h3 className="text-[#384B59] text-left">
              Al ingresar tu código de vivienda tendras acceso a todas las
              funciones del sitio!
            </h3>
            <h3 className="text-[#384B59] text-left mb-[10px]">
              Tambien puedes modificar los datos que se hayan registrado
              incorrectamente!
            </h3>
          </div>
          <div className="grid grid-cols-2 max-md:grid-cols-1">
            {formData.map(({ name, type, placeholder }) => {
              return (
                <div className="flex flex-col items-center mx-5" key={name}>
                  <label className="w-[256px] text-[#384B59] ">
                    {placeholder}:
                  </label>
                  <input
                    className="text-black h-[40px] w-[256px] rounded-[15px] px-2 outline-0 mx-5 bg-white"
                    type={type}
                    id={name}
                    name={name}
                    value={data[name as keyof IRegister]}
                    placeholder={placeholder}
                    onChange={handleChange}
                  />
                  {errors[name as keyof IRegister] ? (
                    <span className="text-red-500 block w-[256px] text-sm">
                      {errors[name as keyof IRegister]}
                    </span>
                  ) : null}
                </div>
              );
            })}
          </div>
        </div>
        <button
          type="submit"
          disabled={Object.keys(errors).some(
            (e) => errors[e as keyof IRegister],
          )}
          className="bg-sih-blue h-[37px] w-[200px] rounded-[15px] text-base p-1 mt-[20px]"
        >
          Actualizar datos
        </button>
      </form>
    </div>
  );
};
export default UpdateFormGoogle;
