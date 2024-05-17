"use client";
import { ReactElement, useEffect } from "react";
import { useUserContext } from "@/components/UserProvider";
import ExpensesOwner from "@/components/expenses/expensesOwner/ExpensesOwner";
import ExpensesAdmin from "@/components/expenses/expensesAdmin/ExpensesAdmin";

const Expenses: React.FC = (): React.ReactElement => {
  const { user, setUser } = useUserContext();
  useEffect(() => {
    const checkToken = async () => {
      const currentUser = await JSON.parse(localStorage.user);
      setUser(currentUser);
    };

    checkToken();
  }, []);
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
