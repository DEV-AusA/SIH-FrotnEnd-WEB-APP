import Link from "next/link";
import { usePathname } from "next/navigation";

const AuthMenu: React.FC = (): React.ReactElement => {
  const pathname = usePathname();
  return (
    <div className="flex flex-col text-end text-xl ">
      <Link
        href="/ingreso"
        className={`${pathname === "/ingreso" ? "cursor-default my-1 text-[#FFBD5C] disabled" : "hover:text-[#FFBD5C] my-1"}`}
      >
        Ingresa
      </Link>
      <Link
        href="/registro"
        className={`${pathname === "/registro" ? "cursor-default mb-1 text-[#FFBD5C] disabled" : "hover:text-[#FFBD5C] mb-1"}`}
      >
        Regístrate
      </Link>
    </div>
  );
};
export default AuthMenu;
