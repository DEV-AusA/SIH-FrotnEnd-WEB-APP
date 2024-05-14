"use client";

import { ChangeEvent, FormEvent, useState, useEffect } from "react";
import { IRegister } from "@/helpers/types";
import validateUpdate from "./helpers/validateUpdate";
import { formData } from "./helpers/updateFormData";
import { useUserContext } from "../UserProvider";
/* import axios from "axios"; */
import Image from "next/image";
import updateDto from "./helpers/updateDto";
/* import Swal from "sweetalert2"; */
/* import { useRouter } from "next/navigation"; */

/* const REGISTERUSER_URL = process.env.NEXT_PUBLIC_API_URL; */

const UpdateForm: React.FC = (): React.ReactElement => {
  const initialState: IRegister = {
    file: "",
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
  /* const router = useRouter(); */

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    setData({ ...data, [name]: value });

    setErrors(validateUpdate({ ...data, [name]: value }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const newdata = updateDto(data);
    console.log(newdata);
    /* axios
      .post(`${REGISTERUSER_URL}/auth/signup`, userdata)
      .then(({ data }) => data)
      .then((data) => {
        console.log(data);
        router.push("/ingreso");
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Gracias por registrarte!\n Recuerda confirmar tu correo!",
          showConfirmButton: true,
          timer: 1500,
        });
      })
      .catch((error) => {
        console.log(error);
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: error.response.data.message,
          showConfirmButton: false,
          timer: 2500,
        });
      }); */
  };

  return (
    <div className="w-full flex flex-col  items-center px-[200px] py-24 ">
      <form onSubmit={handleSubmit} className="flex flex-col items-center">
        <div className="flex flex-wrap justify-center">
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
          <input
            type="file"
            accept="image/*"
            id="file"
            name="file"
            value={data.file}
          />
          {formData.map(({ name, type, placeholder }) => {
            return (
              <div className="flex flex-col items-center" key={name}>
                <input
                  className="text-black h-[40px] w-[256px] bg-sih-grey rounded-[15px] px-2 outline-0 m-[10px]"
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
          Regístrate
        </button>
      </form>
    </div>
  );
};
export default UpdateForm;
