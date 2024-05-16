"use client";
import { useUserContext } from "@/components/UserProvider";
import DashboardAdmin from "@/components/dashboards/dashboardAdmin/DashboardAdmin";
import DashboardGoogle from "@/components/dashboards/dashboardGoogle/DashboardGoogle";
import DashboardSecurity from "@/components/dashboards/dashboardSecurity/DashboardSecurity";
import DashboardOwner from "@/components/dashboards/dshboardOwner/DashboardOwner";
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
  console.log(user?.rol);
  let children: ReactElement | null = null;
  switch (user?.rol) {
    case "owner":
      children = <DashboardOwner />;
      break;
    case "admin":
      children = <DashboardAdmin />;
      break;
    case "security":
      children = <DashboardSecurity />;
      break;
    case "googletemp":
      children = <DashboardGoogle />;
      break;
    default:
      break;
  }
  return <>{children}</>;
};

export default Dashboard;
