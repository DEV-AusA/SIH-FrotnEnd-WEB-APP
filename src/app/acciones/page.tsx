"use client";
import { useUserContext } from "@/components/UserProvider";
import DashboardAdmin from "@/components/dashboards/dashboardAdmin/DashboardAdmin";
import DashboardSecurity from "@/components/dashboards/dashboardSecurity/DashboardSecurity";
import DashboardOwner from "@/components/dashboards/dshboardOwner/DashboardOwner";
import { ReactElement } from "react";

const Dashboard: React.FC = (): React.ReactElement => {
  const { user } = useUserContext();
  console.log(user?.rol);
  let children: ReactElement;
  switch (user?.rol) {
    case "user":
      children = <DashboardOwner />;
      break;
    case "admin":
      children = <DashboardAdmin />;
      break;
    default:
      children = <DashboardSecurity />;
      break;
  }
  return <>{children}</>;
};

export default Dashboard;
