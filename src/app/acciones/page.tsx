"use client";
import { useUserContext } from "@/components/UserProvider";
import DashboardAdmin from "@/components/dashboards/dashboardAdmin/DashboardAdmin";
import DashboardSecurity from "@/components/dashboards/dashboardSecurity/DashboardSecurity";
import DashboardOwner from "@/components/dashboards/dshboardOwner/DashboardOwner";
import { useRouter } from "next/navigation";
import { ReactElement } from "react";

const Dashboard: React.FC = (): React.ReactElement => {
  const { user } = useUserContext();
  const router = useRouter();
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
    default:
      router.push("/ingreso");
      break;
  }
  return <>{children}</>;
};

export default Dashboard;
