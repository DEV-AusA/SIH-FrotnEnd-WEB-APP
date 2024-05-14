import { useUserContext } from "@/components/UserProvider";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { useEffect } from "react";

const AuthMenu: React.FC = (): React.ReactElement => {
  const router = useRouter();
  const { token, setToken, setUser } = useUserContext();
  const pathname = usePathname();

  useEffect(() => {
    const checkToken = async () => {
      const currentToken = await localStorage.getItem("token");
      setToken(currentToken);
    };

    checkToken();
  }, []);

  const handleLogOut = () => {
    localStorage.clear();
    setToken(null);
    setUser(null);
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "¡Nos vemos pronto!",
      showConfirmButton: false,
      timer: 1500,
    });
    router.push("/ingreso");
  };
  if (token) {
    return (
      <div className="flex flex-col text-end text-xl ">
        <Link
          href="/acciones"
          className={`${pathname === "/acciones" ? "cursor-default mb-1 text-[#FFBD5C] disabled" : "hover:text-[#FFBD5C] mb-1"}`}
        >
          Perfil
        </Link>
        <span
          onClick={handleLogOut}
          className="hover:text-[#FFBD5C] my-1 cursor-pointer"
        >
          Cerrar sesión
        </span>
      </div>
    );
  } else {
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
  }
};
export default AuthMenu;
