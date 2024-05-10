"use client";

import { ChangeEvent, FormEvent, useState } from "react";
import { ILogin } from "@/helpers/types";
import validateLogin from "@/components/loginForm/helpers/validateLogin";
import { formData } from "./helpers/loginFormData";
import axios from "axios";

const LOGINUSER_URL = process.env.NEXT_PUBLIC_API_URL;

const LoginForm: React.FC = (): React.ReactElement => {
  const initialState: ILogin = {
    user: "",
    password: "",
  };
  const [data, setData] = useState(initialState);
  const [errors, setErrors] = useState(initialState);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    setData({ ...data, [name]: value });

    setErrors(validateLogin({ ...data, [name]: value }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(data);
    axios
      .post(`${LOGINUSER_URL}/auth/signin`, data)
      .then(({ data }) => data)
      .then((data) => console.log(data))
      .catch((error) => alert(error.message));
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex flex-col items-center">
        {formData.map(({ name, type, placeholder }) => {
          return (
            <div className="flex flex-col items-center" key={name}>
              <input
                className="text-black h-[40px] w-[256px] bg-sih-grey rounded-[15px] px-2 outline-0 m-[10px]"
                type={type}
                id={name}
                name={name}
                value={data[name as keyof ILogin]}
                placeholder={placeholder}
                onChange={handleChange}
              />
              {errors[name as keyof ILogin] ? (
                <span className="text-red-500 block w-[256px] text-sm">
                  {errors[name as keyof ILogin]}
                </span>
              ) : null}
            </div>
          );
        })}
        <button
          type="submit"
          disabled={
            data.user.length === 0 ||
            Object.keys(errors).some((e) => errors[e as keyof ILogin])
          }
          className="bg-sih-blue h-[37px] w-[200px] rounded-[15px] text-base p-1 mt-[20px]"
        >
          Iniciar sesión
        </button>
      </form>
    </div>
  );
};
export default LoginForm;
