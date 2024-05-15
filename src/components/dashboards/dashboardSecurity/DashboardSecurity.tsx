"use client";

import Image from "next/image";
import Link from "next/link";
import { useUserContext } from "@/components/UserProvider";
import { useEffect } from "react";

const buttonsOwner = [
  { image: "/icons/owner.png", title: "Propietarios", href: "/" },
  { image: "/icons/guest.png", title: "Invitados", href: "/" },
  { image: "/icons/delivery.png", title: "Paquetería", href: "/" },
  { image: "/icons/chat.png", title: "Chat", href: "/" },
];

const DashboardSecurity: React.FC = (): React.ReactElement => {
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
        <main className="px-[200px] py-[60px] flex justify-between max-2xl:px-[50px] max-[1800px]:px-[100px] max-[1330px]:flex-col max-cellphone:px-[33px] max-cellphone:py-[25px]">
          <div className="min-h-[760px] min-w-[430px] bg-sih-blue rounded-[30px] ml-[100px] max-2xl:ml-[0px] flex flex-col items-center pt-[50px] max-[1330px]:flex-row max-[1330px]:w-[auto] max-[1330px]:min-h-[auto] max-[1330px]:justify-around max-[1330px]:py-[30px] max-cellphone:min-h-[auto] max-cellphone:min-w-[auto] max-cellphone:py-[15px]">
            <Image
              className="rounded-full border-8 border-white h-[260px] w-[260px] max-md:h-[173px] max-md:w-[173px] max-cellphone:h-[100px] max-cellphone:w-[100px]"
              src={data.image}
              height={260}
              width={260}
              alt="Imagen del usuario"
            ></Image>
            <div className="text-center">
              <h2 className="text-[35px] text-white mt-[30px] max-[1330px]:mt-0 max-md:text-[22px] max-cellphone:text-[16px]">{`${data.name} ${data.lastName}`}</h2>
              <h3 className="text-[30px] text-sih-orange mt-[10px] max-[1330px]:mt-0 max-md:text-[20px] max-cellphone:text-[12px]">
                {data.rol === "owner"
                  ? "Propietario"
                  : data.rol === "admin"
                    ? "Administrador"
                    : "Seguridad"}
              </h3>
              <h4 className="text-[25px] text-sih-orange mt-[10px] max-[1330px]:mt-0 max-md:text-[16px] max-cellphone:text-[10px]">
                {data.cellphone}
              </h4>
              <Link
                className="h-[60px] w-[280px] bg-white mt-[100px] duration-150 rounded-[15px] text-sih-blue text-[32px] flex justify-center items-center font-bold hover:bg-sih-orange shadow-button max-[1330px]:mt-[20px] max-md:w-[186px]  max-md:text-[22px] max-cellphone:text-[12px] max-cellphone:h-[26px] max-cellphone:w-[126px] max-cellphone:mt-[10px]"
                href="/perfil"
              >
                Actualizar datos
              </Link>
            </div>
          </div>
          <div className="">
            <h2 className="text-center items-center text-[48px] text-sih-blue font-bold max-[1330px]:mt-[30px] max-md:text-[32px] max-cellphone:text-[20px]">{`¡Hola de nuevo, ${data.name}!`}</h2>
            <h3 className="text-center items-center text-[32px] text-sih-blue mb-[10px] max-md:text-[22px] max-cellphone:text-[20px]">
              ¿Qué deseas hacer hoy?
            </h3>
            <div className="flex justify-center flex-wrap items-center max-cellphone:flex-col">
              {buttonsOwner.map((button) => {
                return (
                  <Link
                    href={button.href}
                    key={button.title}
                    className="h-[180px] w-[300px] bg-white m-3 flex justify-center flex-col items-center rounded-[15px] mx-[45px] my-[40px] shadow-button hover:bg-sih-orange  duration-150  hover:scale-105 max-[900px]:mx-[10px] max-md:h-[120px] max-md:w-[200px] max-cellphone:w-[300px] max-cellphone:h-[70px] max-cellphone:flex-row max-cellphone:justify-between max-cellphone:my-[20px] max-[400px]:w-[240px]"
                  >
                    <Image
                      className="h-[90px] w-auto max-md:w-[70px] max-md:h-[66px] max-cellphone:m-[10px] max-cellphone:w-[66px] max-cellphone:h-[55px]"
                      src={button.image}
                      height={100}
                      width={110}
                      alt="Imagen de botón"
                    />
                    <div className="flex justify-center items-center w-full">
                      <h2 className="text-[30px] font-bold text-sih-blue max-md:text-[22px] max-cellphone:mr-[10px] max-[400px]:text-[18px]">
                        {button.title}
                      </h2>
                    </div>
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
export default DashboardSecurity;
