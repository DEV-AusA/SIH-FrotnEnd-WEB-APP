"use client";
import { ReactElement } from "react";
import { useUserContext } from "@/components/UserProvider";
import OwnerAuthorization from "@/components/ownerAuthorization/OwnerAuthorization";
import SecurityAuthorization from "@/components/securityAuthorization/SecurityAuthorization";
const Authorizations = () => {
  const { user } = useUserContext();
  let children: ReactElement | null = null;
  switch (user?.rol) {
    case "owner":
      children = <OwnerAuthorization />;
      break;
    case "security":
      children = <SecurityAuthorization />;
      break;
    default:
      break;
  }

  return <>{children}</>;
};

export default Authorizations;
