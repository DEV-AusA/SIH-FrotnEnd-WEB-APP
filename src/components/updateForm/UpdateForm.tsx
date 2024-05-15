"use client";

import { ChangeEvent, FormEvent, useState, useEffect } from "react";
import { IRegister, IUser } from "@/helpers/types";
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
  const initialState: IRegister = {
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
  const [errors, setErrors] = useState(initialState);
  const { user, setUser } = useUserContext();
  useEffect(() => {
    const checkToken = async () => {
      const currentUser = await JSON.parse(localStorage.user);
      setUser(currentUser);
    };

    checkToken();
  }, []);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    setData({ ...data, [name]: value });

    setErrors(validateUpdate({ ...data, [name]: value }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const newdata = updateDto(data);
    axios
      .put(`${REGISTERUSER_URL}/users/update/${user?.id}`, newdata)
      .then(() => {
        axios
          .get(`${REGISTERUSER_URL}/users/${user?.id}`)
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
          title: "Se han actulizado tus datos.",
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
    }

    const formData = new FormData();
    formData.append("file", file);
    console.log(formData);

    axios
      .put(`${REGISTERUSER_URL}/users/update/${user?.id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(() => {
        axios
          .get(`${REGISTERUSER_URL}/users/${user?.id}`)
          .then(({ data }) => data)
          .then((data) => {
            const userInfo = userDto(data);
            setUser(userInfo);
            localStorage.setItem("user", JSON.stringify(userInfo));
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
  };

  return (
    <div className="w-full flex flex-col  items-center px-[200px] py-10 ">
      <h2 className="text-[#384B59] text-4xl font-bold text-center px-[160px] max-[1330px]:px-0 max-md:text-[20px]">
        Tus datos
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
            <div className="flex flex-col m-6 items-center">
              <input
                type="file"
                accept="image/*"
                id="file"
                name="file"
                className="text-black flex flex-wrap flex-col max-md:w-[320px]"
              />
              <button
                onClick={uploadImage}
                className="bg-sih-blue h-[37px] w-[200px] rounded-[15px] text-base p-1 mt-[20px]"
              >
                Subir imagen
              </button>
            </div>
          </div>
          <h2 className="text-[#384B59] text-4xl font-bold text-center px-[160px] max-[1330px]:px-0 max-md:text-[20px] m-3">
            Llena los espacios de los datos que desees actualizar.
          </h2>
          {formData.map(({ name, type, placeholder }) => {
            return (
              <div className="flex items-center" key={name}>
                <label className="w-40 text-[#384B59] ">{placeholder}:</label>
                <input
                  className="text-black h-[40px] w-[256px] bg-sih-grey rounded-[15px] px-2 outline-0 m-[10px] border-2 border-black"
                  type={type}
                  id={name}
                  name={name}
                  value={user ? user[name as keyof IUser] : ""}
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
      </form>
    </div>
  );
};
export default UpdateForm;
