import GoogleButton from "@/components/googleButton/GoogleButton";
import LoginForm from "@/components/loginForm/LoginForm";
import LoginImage from "@/components/loginForm/loginImage/LoginImage";
import ServicesCards from "@/components/services/ServicesCards";
import Link from "next/link";
export default function Login() {
  return (
    <>
      <main className="flex justify-between px-200 bg-white min-h-[600px]">
        <div className="w-full flex flex-col  items-center px-[200px] py-24 ">
          <h1 className=" text-[#384B59] text-4xl font-bold pb-[60px]">
            ¡Nos alegra tenerte de vuelta!
          </h1>
          <LoginForm />
          <span className="text-sih-blue my-[10px]">O</span>
          <GoogleButton />
          <span className="text-sih-blue mt-[15px]">
            Si no tienes una cuenta, regístrate{" "}
            <Link href="/registro">
              <u className="text-sih-orange">aquí</u>
            </Link>
          </span>
        </div>
        <LoginImage />
      </main>
      <ServicesCards />
    </>
  );
}
