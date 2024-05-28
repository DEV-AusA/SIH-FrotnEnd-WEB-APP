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
import userDto from "../loginForm/helpers/userDto";

const REGISTERUSER_URL = process.env.NEXT_PUBLIC_API_URL;

const UpdateForm: React.FC = (): React.ReactElement => {
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
    code: "",
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
      .put(`${REGISTERUSER_URL}/users/update/${user?.id}`, newdata, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        axios
          .get(`${REGISTERUSER_URL}/users/${user?.id}`, {
            headers: { Authorization: `Bearer ${token}` },
          })
          .then(({ data }) => data)
          .then((data) => {
            const userInfo = userDto(data);
            setUser(userInfo);
            localStorage.setItem("user", JSON.stringify(userInfo));
          });
      })
      .then(() => {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Se han actualizado tus datos.",
          showConfirmButton: true,
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
  const uploadImage = () => {
    const fileInput = document.getElementById("file") as HTMLInputElement;
    const file = fileInput.files ? fileInput.files[0] : null;

    if (!file) {
      Swal.fire({
        icon: "error",
        title: "No has seleccionado un archivo.",
        showConfirmButton: true,
      });
      return;
    }
    const maxSize = 200 * 1024;

    if (file.size > maxSize) {
      Swal.fire({
        icon: "error",
        title: "El tamaño máximo del archivo es de 200KB.",
        showConfirmButton: true,
      });
      fileInput.value = "";
      return;
    } else {
      const formData = new FormData();
      formData.append("file", file);
      axios
        .put(`${REGISTERUSER_URL}/users/update/${user?.id}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        })
        .then(() => {
          axios
            .get(`${REGISTERUSER_URL}/users/${user?.id}`, {
              headers: { Authorization: `Bearer ${token}` },
            })
            .then(({ data }) => data)
            .then((data) => {
              const userInfo = userDto(data);
              setUser(userInfo);
              localStorage.setItem("user", JSON.stringify(userInfo));
            });
        })
        .then(() => {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Imagen subida con exito.",
            showConfirmButton: true,
          });
        })
        .catch((error) => {
          console.log(error);
          Swal.fire({
            icon: "error",
            title: "Lo sentimos, algo ha salido mal.",
            showConfirmButton: true,
          });
        });
    }
  };

  return (
    <div className="w-full flex flex-col items-center py-10 p-[200px] max-2xl:px-[50px]">
      <form onSubmit={handleSubmit} className="flex flex-col items-center">
        <div className="flex flex-row items-center max-[1000px]:flex-col">
          <div className="flex flex-col  items-center mt-[39px] max-md:flex-col">
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
            <div className="flex flex-col m-6 items-center">
              <input
                type="file"
                accept="image/*"
                id="file"
                name="file"
                className="block w-full mb-5 text-xs text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
              />
              <button
                type="button"
                onClick={uploadImage}
                className="bg-sih-blue h-[37px] w-[200px] rounded-[15px] text-base p-1 mt-[20px]"
              >
                Subir imagen
              </button>
            </div>
          </div>
          <div className="flex flex-col  items-center">
            <h2 className="text-[#384B59] text-xl  text-center px-8 max-md:text-[20px] m-3">
              Llena los espacios de los datos que desees actualizar.
            </h2>
            <div className="grid grid-cols-2 max-md:grid-cols-1">
              {formData.map(({ name, type, placeholder }) => {
                return (
                  <div
                    className="flex flex-col items-center mx-5 my-1"
                    key={name}
                  >
                    <label className="w-[256px] text-[#384B59] ">
                      {placeholder}:
                    </label>
                    <input
                      className="text-black h-[40px] w-[256px] rounded-[15px] px-2 outline-0 mx-5  border-black bg-white"
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
            <button
              type="submit"
              disabled={Object.keys(errors).some(
                (e) => errors[e as keyof IRegister],
              )}
              className="bg-sih-blue h-[37px] w-[200px] rounded-[15px] text-base p-1 mt-[20px]"
            >
              Actualizar datos
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
export default UpdateForm;
