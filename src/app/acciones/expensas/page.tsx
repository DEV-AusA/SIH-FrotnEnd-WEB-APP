"use client";
import { ReactElement, useEffect } from "react";
import { useUserContext } from "@/components/UserProvider";
import ExpensesOwner from "@/components/expenses/expensesOwner/ExpensesOwner";
import ExpensesAdmin from "@/components/expenses/expensesAdmin/ExpensesAdmin";
import { useRouter } from "next/navigation";

const Expenses: React.FC = (): React.ReactElement | null => {
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
      children = <ExpensesOwner />;
      break;
    case "admin":
      children = <ExpensesAdmin />;
      break;
    default:
      break;
  }
  if (isLogged) {
    return <>{children}</>;
  } else {
    router.push("/ingreso");
    return null;
  }
};
export default Expenses;
