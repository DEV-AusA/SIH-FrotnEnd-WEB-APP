"use client";

import Image from "next/image";
import Link from "next/link";
/* import { IUser } from "@/helpers/types"; */
import { useUserContext } from "@/components/UserProvider";
import { useEffect } from "react";

/* const data: IUser = {
  name: "Manuel",
  document: 12345787,
  lastName: "Guaicara",
  email: "manu@gmail.com",
  phone: 3517899626,
  cellphone: 1231564,
  rol: "user",
  image: "https://i.ibb.co/8rc9VCF/Profile-3-2.png",
  lastLogin: "ayer",
}; */

const buttonsOwner = [
  { image: "/icons/pay.png", title: "Realizar pago", href: "/" },
  { image: "/icons/check.png", title: "Autorizaciones", href: "/" },
  { image: "/icons/bill.png", title: "Mis facturas", href: "/" },
  { image: "/icons/chat.png", title: "Chat", href: "/" },
];

const DashboardOwner: React.FC = (): React.ReactElement => {
  const { user, setUser } = useUserContext();
  useEffect(() => {
    const checkToken = async () => {
      const currentUser = await JSON.parse(localStorage.user);
      setUser(currentUser);
    };

    checkToken();
  }, []);
  const data = user;
  return (
    <div>
      {data ? (
        <main className="px-[200px] py-[60px] flex justify-between max-2xl:px-[50px] max-[1800px]:px-[100px] max-[1330px]:flex-col">
          <div className="min-h-[760px] min-w-[430px] bg-sih-blue rounded-[30px] ml-[100px] max-2xl:ml-[0px] flex flex-col items-center pt-[50px] max-[1330px]:flex-row max-[1330px]:w-[auto] max-[1330px]:min-h-[auto] max-[1330px]:justify-around max-[1330px]:py-[30px]">
            <Image
              className="rounded-full border-8 border-white h-[260px] w-[260px] max-md:h-[173px] max-md:w-[173px]"
              src={data.image}
              height={260}
              width={260}
              alt="Imagen del usuario"
            ></Image>
            <div className="text-center">
              <h2 className="text-[35px] text-white mt-[30px] max-[1330px]:mt-0 max-md:text-[22px]">{`${data.name} ${data.lastName}`}</h2>
              <h3 className="text-[30px] text-sih-orange mt-[10px] max-[1330px]:mt-0 max-md:text-[20px]">
                {data.rol === "user"
                  ? "Propietario"
                  : data.rol === "admin"
                    ? "Administrador"
                    : "Security"}
              </h3>
              <h4 className="text-[25px] text-sih-orange mt-[10px] max-[1330px]:mt-0 max-md:text-[16px]">
                {data.phone}
              </h4>
              <Link
                className="h-[60px] w-[280px] bg-white mt-[100px] duration-150 rounded-[15px] text-sih-blue text-[32px] flex justify-center items-center font-bold hover:bg-sih-orange shadow-button max-[1330px]:mt-[20px] max-md:w-[186px] max-md:text-[22px]"
                href="/perfil"
              >
                Actualizar datos
              </Link>
            </div>
          </div>
          <div className="">
            <h2 className="text-center items-center text-[48px] text-sih-blue font-bold max-[1330px]:mt-[30px] max-[600px]:text-[32px]">{`¡Bienvenido ${data.name}!`}</h2>
            <h3 className="text-center items-center text-[32px] text-sih-blue mb-[10px] max-[600px]:text-[22px]">
              ¿Qué deseas hacer hoy?
            </h3>
            <div className="flex justify-center flex-wrap items-center">
              {buttonsOwner.map((button) => {
                return (
                  <Link
                    href={button.href}
                    key={button.title}
                    className="h-[180px] w-[300px] bg-white m-3 flex justify-center flex-col items-center rounded-[15px] mx-[45px] my-[40px] shadow-button hover:bg-sih-orange  duration-150  hover:scale-105 max-[900px]:mx-[10px] max-md:h-[120px] max-md:w-[200px]"
                  >
                    <Image
                      className="max-md:w-[80px] max-md:h-[66px]"
                      src={button.image}
                      height={100}
                      width={120}
                      alt="Imagen de botón"
                    />
                    <h2 className="text-[32px] font-bold text-sih-blue max-md:text-[22px]">
                      {button.title}
                    </h2>
                  </Link>
                );
              })}
            </div>
          </div>
        </main>
      ) : (
        ""
      )}
    </div>
  );
};
export default DashboardOwner;
