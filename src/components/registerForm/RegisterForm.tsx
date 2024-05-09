"use client";

import { ChangeEvent, FormEvent, useState } from "react";
import { IRegister } from "@/helpers/types";
import validateRegister from "@/components/registerForm/helpers/validateRegister";
import { formData } from "./helpers/registerFormData";

const RegisterForm: React.FC = (): React.ReactElement => {
  const initialState: IRegister = {
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
  const [data, setData] = useState(initialState);
  const [errors, setErrors] = useState(initialState);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    setData({ ...data, [name]: value });

    setErrors(validateRegister({ ...data, [name]: value }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    alert("Estamos trabajando para que ingreses correctamente");
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex flex-col items-center">
        <div className="flex flex-wrap justify-center">
          {formData.map(({ name, type, placeholder }) => {
            return (
              <div key={name}>
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
                  <span className="text-black">
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
          className="bg-sih-blue h-[37px] w-[176px] rounded-[15px] text-base p-1 mt-[20px]"
        >
          Regístrate
        </button>
      </form>
    </div>
  );
};
export default RegisterForm;
