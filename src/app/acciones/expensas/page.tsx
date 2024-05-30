"use client";
import { ReactElement, useEffect } from "react";
import { useUserContext } from "@/components/UserProvider";
import ExpensesOwner from "@/components/expenses/expensesOwner/ExpensesOwner";
import { useRouter } from "next/navigation";
import TableExpenses from "@/components/expenses/expensesAdmin/TableExpenses";
import BackLink from "@/components/backButton/BackLink";

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
      children = (
        <div className="flex flex-col">
          <div className="flex items-center justify-between px-[200px] mt-[20px] max-md:justify-center max-md:px-12">
            <BackLink href="/acciones" />
            <div className="flex-1 flex justify-center">
              <h2 className="text-[#384B59] text-4xl font-bold text-center px-8 max-md:text-[20px] my-[20px] ">
                Tus Expensas
              </h2>
            </div>
          </div>
          <ExpensesOwner />
        </div>
      );
      break;
    case "admin":
      children = (
        <div className="flex flex-col">
          <div className="flex items-center justify-between px-[200px] mt-[20px] max-md:justify-center max-md:px-12">
            <BackLink href="/acciones" />
            <div className="flex-1 flex justify-center">
              <h2 className="text-[#384B59] text-4xl font-bold text-center px-8 max-md:text-[20px] my-[20px] mr-0 sm:mr-[45px]">
                Expensas
              </h2>
            </div>
          </div>
          <TableExpenses />
        </div>
      );
      break;
    default:
      break;
  }

  return <>{children}</>;
};
export default Expenses;
