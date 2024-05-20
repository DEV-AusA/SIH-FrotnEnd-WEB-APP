"use client";
import { ReactElement, useEffect } from "react";
import { useUserContext } from "@/components/UserProvider";
import ExpensesOwner from "@/components/expenses/expensesOwner/ExpensesOwner";
import ExpensesAdmin from "@/components/expenses/expensesAdmin/ExpensesAdmin";
import { useRouter } from "next/navigation";

const Expenses: React.FC = (): React.ReactElement | null => {
  const router = useRouter();
  const { user, setUser } = useUserContext();
  useEffect(() => {
    const checkToken = async () => {
      const userString = localStorage.getItem("user");
      if (userString) {
        const currentUser = JSON.parse(userString);
        setUser(currentUser);
        if (currentUser.rol !== "admin" && currentUser.rol !== "owner") {
          router.push("/");
        }
      } else {
        router.push("/ingreso");
      }
    };

    checkToken();
  }, [setUser, router]);
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

  return <>{children}</>;
};
export default Expenses;
