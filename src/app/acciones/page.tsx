"use client";
import { useUserContext } from "@/components/UserProvider";
import DashboardAdmin from "@/components/dashboards/dashboardAdmin/DashboardAdmin";
import DashboardGoogle from "@/components/dashboards/dashboardGoogle/DashboardGoogle";
import DashboardSecurity from "@/components/dashboards/dashboardSecurity/DashboardSecurity";
import DashboardOwner from "@/components/dashboards/dshboardOwner/DashboardOwner";
import { useRouter } from "next/navigation";
import { ReactElement, useEffect } from "react";

const Dashboard: React.FC = (): React.ReactElement | null => {
  const isLogged = localStorage.getItem("token");
  const router = useRouter();
  const { user, setUser } = useUserContext();

  useEffect(() => {
    const checkToken = async () => {
      if (localStorage.user) {
        const currentUser = await JSON.parse(localStorage.user);
        setUser(currentUser);
      }
    };

    checkToken();
  }, [setUser]);

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
      children = null;
  }

  if (isLogged) {
    return <>{children}</>;
  } else {
    router.push("/ingreso");
    return null;
  }
};

export default Dashboard;
