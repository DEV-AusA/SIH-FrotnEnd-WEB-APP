"use client";
import { useUserContext } from "@/components/UserProvider";
import UpdateForm from "@/components/updateForm/UpdateForm";
import UpdateFormGoogle from "@/components/updateFormGoogle/UpdateFormGoogle";
import { useRouter } from "next/navigation";
import { ReactElement, useEffect } from "react";

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
      children = <UpdateForm />;
      break;
    case "admin":
      children = <UpdateForm />;
      break;
    case "security":
      children = <UpdateForm />;
      break;
    case "googletemp":
      children = <UpdateFormGoogle />;
      break;
    default:
      break;
  }

  return <>{children}</>;
};

export default Dashboard;
