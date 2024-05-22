"use client";

import { ChangeEvent, FormEvent, useState } from "react";
import validateCreate from "./helpers/validateCreate";
import { ICreateProperty } from "@/helpers/types";
import createDto from "./helpers/createDto";
import axios from "axios";
import Swal from "sweetalert2";
import { createFormData } from "./helpers/createFormData";
import { useUserContext } from "../UserProvider";

const CREATE_URL = process.env.NEXT_PUBLIC_API_URL;

const CreateProperty: React.FC = (): React.ReactElement => {
  const { token } = useUserContext();

  const initialState: ICreateProperty = {
    address: "",
    number: "",
  };
  const [data, setData] = useState(initialState);
  const [errors, setErrors] = useState(initialState);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    setData({ ...data, [name]: value });

    setErrors(validateCreate({ ...data, [name]: value }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
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
      const propertyData = createDto(data);
      formData.append("address", propertyData.address);
      formData.append("number", propertyData.number);
      axios
        .post(`${CREATE_URL}/properties/create`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        })
        .then(({ data }) => data)
        .then(() => {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "¡Propiedad creada correctamente!",
            showConfirmButton: true,
          }).then(() => {
            location.reload();
          });
        })
        .then(() => setData(initialState))
        .catch((error) => {
          console.log(error);
          Swal.fire({
            position: "top-end",
            icon: "error",
            title: error.response.data.message,
            showConfirmButton: false,
            timer: 2500,
          });
        });
    }
  };

  return (
    <section>
      <h2 className="text-[#384B59] text-4xl font-bold text-center px-8 max-md:text-[20px] m-3">
        Agregar una nueva propiedad
      </h2>
      <form onSubmit={handleSubmit} className="flex flex-col items-center">
        {createFormData.map(({ name, type, placeholder }) => {
          return (
            <div className="flex flex-col items-center" key={name}>
              <input
                className="text-black h-[40px] w-[256px] bg-white rounded-[15px] px-2 outline-0 m-[10px]"
                type={type}
                id={name}
                name={name}
                value={data[name as keyof ICreateProperty]}
                placeholder={placeholder}
                onChange={handleChange}
              />
              {errors[name as keyof ICreateProperty] ? (
                <span className="text-red-500 block w-[256px] text-sm">
                  {errors[name as keyof ICreateProperty]}
                </span>
              ) : null}
            </div>
          );
        })}
        <input
          type="file"
          accept="image/*"
          id="file"
          name="file"
          className="block w-[250px] mb-5 text-xs text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
        />
        <button
          type="submit"
          disabled={
            data.address.length === 0 ||
            Object.keys(errors).some((e) => errors[e as keyof ICreateProperty])
          }
          className="bg-sih-blue h-[37px] w-[120px] rounded-[15px] text-base p-1 my-[20px]"
        >
          Agregar
        </button>
      </form>
    </section>
  );
};
export default CreateProperty;
