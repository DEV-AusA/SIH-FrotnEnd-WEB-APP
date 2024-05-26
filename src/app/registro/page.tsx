import GoogleButton from "@/components/googleButton/GoogleButton";
import RegisterForm from "@/components/registerForm/RegisterForm";
import RegisterImage from "@/components/registerForm/registerImage/RegisterImage";
import ServicesCards from "@/components/services/ServicesCards";
import Link from "next/link";
export default function Register() {
  return (
    <>
      <main className="flex justify-between px-200 bg-white min-h-[600px]">
        <div className="w-full flex flex-col  items-center px-[200px] py-24 max-[1700px]:px-[100px] max-[1200px]:px-[50px]">
          <h1 className=" text-[#384B59] text-4xl font-bold pb-[30px] max-[1210px]:text-3xl max-[1040px]:text-2xl max-[470px]:text-lg">
            ¡Te damos la bienvenida!
          </h1>
          <RegisterForm />
          <span className="text-sih-blue my-[10px]">O</span>
          <GoogleButton />
          <span className="text-sih-blue mt-[15px]">
            Si ya tienes una cuenta, inicia sesión{" "}
            <Link href="/ingreso">
              <u className="text-sih-orange">aquí</u>
            </Link>
          </span>
        </div>
        <RegisterImage />
      </main>
      <ServicesCards />
    </>
  );
}
