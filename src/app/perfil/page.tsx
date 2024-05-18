"use client";
import { useUserContext } from "@/components/UserProvider";
import UpdateForm from "@/components/updateForm/UpdateForm";
import UpdateFormGoogle from "@/components/updateFormGoogle/UpdateFormGoogle";
import { ReactElement, useEffect } from "react";

const Dashboard: React.FC = (): React.ReactElement => {
  const { user, setUser } = useUserContext();
  useEffect(() => {
    const checkToken = async () => {
      const currentUser = await JSON.parse(localStorage.user);
      setUser(currentUser);
    };

    checkToken();
  }, []);
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
  return <main>{children}</main>;
};

export default Dashboard;
