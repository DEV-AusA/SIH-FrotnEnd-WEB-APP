"use client";
import { useEffect, useState } from "react";
import { useUserContext } from "../UserProvider";
import axios from "axios";
import { IExpense, IPropertyExpenses } from "@/helpers/types";

const EXPENSES_URL = process.env.NEXT_PUBLIC_API_URL;

const OwnerBills: React.FC = (): React.ReactElement => {
  const [expenses, setExpenses] = useState<IExpense[]>([]);
  const { setToken, setUser } = useUserContext();
  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const storedToken = await localStorage.getItem("token");
        setToken(storedToken);
        const storedUser = await JSON.parse(localStorage.user);
        setUser(storedUser);

        const response = await axios.get(
          `${EXPENSES_URL}/expenses/user/${storedUser?.id}`,
          {
            headers: { Authorization: `Bearer ${storedToken}` },
          },
        );
        const allExpenses: IExpense[] = [];
        response.data.map((property: IPropertyExpenses) =>
          property.expences ? allExpenses.push(property.expences[0]) : null,
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
  return (
    <div>
      <div className="m-auto my-5 relative flex flex-col w-4/5 h-full text-gray-700 bg-white shadow-md rounded-xl bg-clip-border">
        <div className="relative mx-4 mt-4 overflow-hidden text-gray-700 bg-white rounded-none bg-clip-border">
          <div className="flex flex-col justify-between gap-8 mb-4 md:flex-row md:items-center">
            {/* <div>
        <h5 className="block font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
          Recent Transactions
        </h5>
        <p className="block mt-1 font-sans text-base antialiased font-normal leading-relaxed text-gray-700">
          These are details about the last transactions
        </p>
      </div> */}
            <div className="flex w-full gap-2 shrink-0 md:w-max"></div>
          </div>
        </div>
        {/* Tabla */}

        <div className="p-6 px-0 overflow-scroll">
          <table className="w-full mt-4 text-left table-auto min-w-max">
            <thead>
              <tr>
                <th className="w-[200px] p-4 border-y border-blue-gray-100 bg-blue-gray-50/50">
                  <p className="block font-sans text-sm antialiased font-bold leading-none ">
                    Fecha
                  </p>
                </th>
                <th className=" w-[200px] p-4 border-y border-blue-gray-100 bg-blue-gray-50/50">
                  <p className="block font-sans text-sm antialiased font-bold  leading-none">
                    Valor
                  </p>
                </th>
                <th className="w-[200px] p-4 border-y border-blue-gray-100 bg-blue-gray-50/50">
                  <p className="block font-sans text-sm antialiased font-bold  leading-none ">
                    Concepto
                  </p>
                </th>
                <th className="w-[200px] p-4 border-y border-blue-gray-100 bg-blue-gray-50/50">
                  <p className="block font-sans text-sm antialiased font-bold  leading-none">
                    Estado
                  </p>
                </th>
                <th className=" w-[200px] p-4 border-y border-blue-gray-100 bg-blue-gray-50/50">
                  <p className="block font-sans text-sm antialiased font-bold  leading-none">
                    Propietario
                  </p>
                </th>
              </tr>
            </thead>
            <tbody>
              {expenses && expenses[0] !== undefined ? (
                expenses.map((expense: IExpense) => {
                  return (
                    <div
                      key={expense.id}
                      className={
                        expense?.state
                          ? "w-[300px] bg-white m-3 flex justify-center flex-col items-center rounded-[15px] mx-[45px] my-[40px] shadow-button text-sih-blue border-4 border-sih-green"
                          : "w-[300px] bg-white m-3 flex justify-center flex-col items-center rounded-[15px] mx-[45px] my-[40px] shadow-button text-sih-blue border-4 border-sih-red"
                      }
                    >
                      {expense.dateGenerated ? (
                        <span className="m-2">
                          Generado en: {expense.dateGenerated}
                        </span>
                      ) : (
                        ""
                      )}
                      <span className="m-2">
                        Valor a pagar: {expense.amount}
                      </span>
                      <span className="m-2">
                        {expense.state ? "Pagado" : "Pendiente"}
                      </span>
                      {expense.numberOperation && (
                        <span className="m-2">
                          Confirmación de pago: {expense.numberOperation}
                        </span>
                      )}
                      {expense.datePaid && (
                        <span className="m-2">
                          Pagado en: {expense.datePaid}
                        </span>
                      )}
                      {!expense.state && (
                        <button className="bg-sih-orange  rounded-md duration-150  hover:scale-105 p-2 px-5 my-2 shadow-sm shadow-black">
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
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default OwnerBills;
