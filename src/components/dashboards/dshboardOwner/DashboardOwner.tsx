"use client";

import Image from "next/image";
import Link from "next/link";

export interface IUser {
  name: string;
  lastName: string;
  email: string;
  phone: string;
  rol: "admin" | "owner" | "security";
  image: string;
}

const data: IUser = {
  name: "Manuel",
  lastName: "Guaicara",
  email: "manu@gmail.com",
  phone: "3517899626",
  rol: "owner",
  image: "https://i.ibb.co/8rc9VCF/Profile-3-2.png",
};

const buttonsOwner = [
  { image: "/icons/pay.png", title: "Realizar pago", href: "/" },
  { image: "/icons/check.png", title: "Autorizaciones", href: "/" },
  { image: "/icons/bill.png", title: "Mis facturas", href: "/" },
  { image: "/icons/chat.png", title: "Chat", href: "/" },
];

const DashboardOwner: React.FC = (): React.ReactElement => {
  return (
    <main className="px-[300px] py-[60px] flex justify-between">
      <div className="min-h-[760px] min-w-[430px] bg-sih-blue rounded-[30px] flex flex-col items-center pt-[50px] ">
        <Image
          className="rounded-full border-8 border-white h-[260px] w-[260px]"
          src={data.image}
          height={260}
          width={260}
          alt="Imagen del usuario"
        ></Image>
        <h2 className="text-[35px] text-white mt-[30px] ">{`${data.name} ${data.lastName}`}</h2>
        <h3 className="text-[30px] text-sih-orange mt-[10px]">
          {data.rol === "owner"
            ? "Propietario"
            : data.rol === "admin"
              ? "Administrador"
              : "Security"}
        </h3>
        <h4 className="text-[25px] text-sih-orange mt-[10px] ">{data.phone}</h4>
        <Link
          className="h-[60px] w-[280px] bg-white mt-[100px] duration-150 rounded-[15px] text-sih-blue text-[32px] flex justify-center items-center font-bold hover:bg-sih-orange shadow-button"
          href="/perfil"
        >
          Actualizar datos
        </Link>
      </div>
      <div className="">
        <h2 className="text-center items-center text-[48px] text-sih-blue font-bold">{`¡Bienvenido ${data.name}!`}</h2>
        <h3 className="text-center items-center text-[32px] text-sih-blue mb-[10px]">
          ¿Qué deseas hacer hoy?
        </h3>
        <div className="flex justify-center flex-wrap items-center">
          {buttonsOwner.map((button) => {
            return (
              <Link
                href={button.href}
                key={button.title}
                className="h-[180px] w-[300px] bg-white m-3 flex justify-center flex-col items-center rounded-[15px] mx-[45px] my-[40px] shadow-button hover:bg-sih-orange  duration-150  hover:scale-105 "
              >
                <Image
                  src={button.image}
                  height={100}
                  width={120}
                  alt="Imagen de botón"
                />
                <h2 className="text-[32px] font-bold text-sih-blue">
                  {button.title}
                </h2>
              </Link>
            );
          })}
        </div>
      </div>
    </main>
  );
};
export default DashboardOwner;
