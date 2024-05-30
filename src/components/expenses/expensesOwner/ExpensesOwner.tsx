"use client";
import { useUserContext } from "@/components/UserProvider";
import { useState, useEffect } from "react";
import axios from "axios";
import { IExpense, IPropertyExpenses } from "@/helpers/types";
const EXPENSES_URL = process.env.NEXT_PUBLIC_API_URL;

const ExpensesOwner: React.FC = (): React.ReactElement => {
  const [expenses, setExpenses] = useState<IExpense[]>([]);
  const { token, setToken, user, setUser } = useUserContext();
  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const storedToken = await localStorage.getItem("token");
        setToken(storedToken);
        const storedUser = await JSON.parse(localStorage.user);
        setUser(storedUser);

        const response = await axios.get(
          `${EXPENSES_URL}/expenses/user/${user?.id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );
        const allExpenses: IExpense[] = [];
        response.data.map((property: IPropertyExpenses) =>
          property.expences
            ? property.expences.map((expence) => allExpenses.push(expence))
            : null,
        );
        if (allExpenses.length === 0) {
          setExpenses([]);
        } else {
          setExpenses(allExpenses);
        }
      } catch (error) {
        console.log("Error al obtener las expensas:", error);
        setExpenses([]);
      }
    };

    fetchExpenses();
  }, []);
  const payExpense = (id: string, amount: number) => {
    axios
      .post(
        `${EXPENSES_URL}/expenses/createPay`,
        {
          id: id,
          amount: amount,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      )
      .then((data) => {
        window.location.replace(data.data.urlMercadopago);
      });
  };
  return (
    <main className="flex flex-col items-center py-10">
      <div className="flex flex-wrap">
        {expenses && expenses[0] !== undefined ? (
          expenses.map((expense: IExpense) => {
            return (
              <div
                key={expense.id}
                className={
                  expense?.state
                    ? "w-[300px] text-center bg-white m-3 flex justify-center flex-col items-center rounded-[15px] mx-[45px] my-[40px] shadow-button text-sih-blue border-4 border-sih-green max-md:w-[240px] max-md:mx-0"
                    : "w-[300px] text-center bg-white m-3 flex justify-center flex-col items-center rounded-[15px] mx-[45px] my-[40px] shadow-button text-sih-blue border-4 border-sih-red max-md:w-[240px] max-md:mx-0"
                }
              >
                {expense.dateGenerated ? (
                  <span className="m-1">
                    Generado en: {expense.dateGenerated}
                  </span>
                ) : (
                  ""
                )}
                <span className="m-1">Valor a pagar: {expense.amount}</span>
                <span className="m-1 text-center">
                  Descripción: {expense.description}
                </span>
                <span className="m-1">
                  {expense.state ? "Pagado" : "Pendiente"}
                </span>
                {expense.numberOperation && (
                  <span className="m-1 text-center">
                    Confirmación de pago: {expense.numberOperation}
                  </span>
                )}
                {expense.datePaid && (
                  <span className="m-1">Pagado en: {expense.datePaid}</span>
                )}
                {!expense.state && (
                  <button
                    onClick={() =>
                      payExpense(expense.id, Number(expense.amount))
                    }
                    className="bg-sih-orange  rounded-md duration-150  hover:scale-105 p-2 px-5 my-2 shadow-sm shadow-black"
                  >
                    Pagar
                  </button>
                )}
              </div>
            );
          })
        ) : (
          <div className="text-[#384B59] text-4xl font-semibold text-center px-8 max-md:text-[20px] m-3">
            Aun no hay expensas registradas
          </div>
        )}
      </div>
    </main>
  );
};
export default ExpensesOwner;
