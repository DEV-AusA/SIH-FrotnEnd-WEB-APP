"use client";

import { ChangeEvent, FormEvent, useState } from "react";
import { IRegister } from "@/helpers/types";
import validateRegister from "@/components/registerForm/helpers/validateRegister";
import { formData } from "./helpers/registerFormData";
import axios from "axios";
import registerDto from "./helpers/registerDto";

const REGISTERUSER_URL = process.env.NEXT_PUBLIC_API_URL;

const RegisterForm: React.FC = (): React.ReactElement => {
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

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    setData({ ...data, [name]: value });

    setErrors(validateRegister({ ...data, [name]: value }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const userdata = registerDto(data);
    axios
      .post(`${REGISTERUSER_URL}/auth/signup`, userdata)
      .then(({ data }) => data)
      .then((data) => console.log(data))
      .catch((error) => console.log(error.response.data));
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex flex-col items-center">
        <div className="flex flex-wrap justify-center">
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
          disabled={
            data.email.length === 0 ||
            Object.keys(errors).some((e) => errors[e as keyof IRegister])
          }
          className="bg-sih-blue h-[37px] w-[200px] rounded-[15px] text-base p-1 mt-[20px]"
        >
          Regístrate
        </button>
      </form>
    </div>
  );
};
export default RegisterForm;
