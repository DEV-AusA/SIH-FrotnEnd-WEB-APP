"use client";
import { useUserContext } from "@/components/UserProvider";
import UpdateForm from "@/components/updateForm/UpdateForm";
import UpdateFormGoogle from "@/components/updateFormGoogle/UpdateFormGoogle";
import { useRouter } from "next/navigation";
import { ReactElement, useEffect } from "react";
import BackLink from "@/components/backButton/BackLink";

const Dashboard: React.FC = (): React.ReactElement | null => {
  const router = useRouter();

  const { user, setUser } = useUserContext();
  useEffect(() => {
    const checkToken = async () => {
      if (localStorage.user) {
        const currentUser = await JSON.parse(localStorage.user);
        setUser(currentUser);
      } else {
        router.push("/ingreso");
      }
    };

    checkToken();
  }, [setUser]);

  let children: ReactElement | null = null;
  switch (user?.rol) {
    case "owner":
      children = (
        <div className="flex flex-col">
          <div className="flex items-center justify-between md:px-[200px] md:mt-[20px]">
            <BackLink href="/acciones" />
            <div className="flex-1 flex justify-center">
              <h2 className="text-[#384B59] text-4xl font-bold text-center px-8 max-md:text-[20px] my-[20px] md:mr-[45px]">
                Tus Datos
              </h2>
            </div>
          </div>
          <UpdateForm />
        </div>
      );
      break;
    case "admin":
      children = (
        <div className="flex flex-col">
          <div className="flex items-center justify-between md:px-[200px] md:mt-[20px]">
            <BackLink href="/acciones" />
            <div className="flex-1 flex justify-center">
              <h2 className="text-[#384B59] text-4xl font-bold text-center px-8 max-md:text-[20px] my-[20px] md:mr-[45px]">
                Tus Datos
              </h2>
            </div>
          </div>
          <UpdateForm />
        </div>
      );
      break;
    case "security":
      children = (
        <div className="flex flex-col">
          <div className="flex items-center justify-between md:px-[200px] md:mt-[20px]">
            <BackLink href="/acciones" />
            <div className="flex-1 flex justify-center">
              <h2 className="text-[#384B59] text-4xl font-bold text-center px-8 max-md:text-[20px] my-[20px] md:mr-[45px]">
                Tus Datos
              </h2>
            </div>
          </div>
          <UpdateForm />
        </div>
      );
      break;
    case "googletemp":
      children = (
        <div className="flex flex-col">
          <div className="flex items-center justify-between md:px-[200px] md:mt-[20px]">
            <BackLink href="/acciones" />
            <div className="flex-1 flex justify-center">
              <h2 className="text-[#384B59] text-4xl font-bold text-center px-8 max-md:text-[20px] my-[20px] md:mr-[45px]">
                Tus Datos
              </h2>
            </div>
          </div>
          <UpdateFormGoogle />
        </div>
      );
      break;
    default:
      break;
  }

  return <>{children}</>;
};

export default Dashboard;
