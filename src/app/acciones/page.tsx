import DashboardOwner from "@/components/dashboards/dshboardOwner/DashboardOwner";
import { ReactElement } from "react";

export interface IUser {
  name: string;
  lastName: string;
  email: string;
  phone: string;
  rol: "admin" | "owner" | "security";
  image: string;
}

const data: IUser = {
  name: "Manuel",
  lastName: "Guaicara",
  email: "manu@gmail.com",
  phone: "3517899626",
  rol: "owner",
  image: "https://i.ibb.co/8rc9VCF/Profile-3-2.png",
};

let children: ReactElement;
switch (data.rol) {
  case "owner":
    children = <DashboardOwner />;
    break;
  // case "admin":
  //   children = <ClienteHijoUsuario data={data} />;
  //   break;
  // case "security":
  //   children = <ClienteHijoInvitado data={data} />;
  //   break;
}
const Dashboard: React.FC = (): React.ReactElement => {
  return <>{children}</>;
};

export default Dashboard;
