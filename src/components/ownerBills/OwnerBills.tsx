"use client";
import { useEffect, useState } from "react";
import { useUserContext } from "../UserProvider";
import axios from "axios";
import { IExpense, IPropertyExpenses } from "@/helpers/types";
import Link from "next/link";

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
  const generatePdf = async (id: string) => {
    try {
      const response = await axios.get(
        `${EXPENSES_URL}/expenses/generatePdf/${id}`,
        {
          responseType: "arraybuffer",
        },
      );

      const blob = new Blob([response.data], { type: "application/pdf" });

      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.download = `expense.pdf`;
      document.body.appendChild(link);
      link.click();

      document.body.removeChild(link);
    } catch (error) {
      console.log(error);
    }
  };
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

        <div className="p-6 px-0 overflow-scroll h-[600px]">
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
              {expenses && expenses[0] !== undefined
                ? expenses.map((expense: IExpense) => {
                    console.log(expense.id);
                    return (
                      <tr key={expense.id}>
                        <td className="p-4 border-b border-blue-gray-50">
                          <div className="flex flex-col">
                            <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                              {expense.dateGenerated}
                            </p>
                          </div>
                        </td>
                        <td className="p-4 border-b border-blue-gray-50">
                          <div className="flex flex-col">
                            <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                              {expense.amount}
                            </p>
                          </div>
                        </td>
                        <td className="p-4 border-b border-blue-gray-50">
                          <div className="flex flex-col">
                            <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                              {expense.description}
                            </p>
                          </div>
                        </td>
                        <td className="p-4 border-b border-blue-gray-50">
                          <p
                            className={
                              expense.state
                                ? "block font-sans text-sm antialiased font-bold leading-normal text-sih-green"
                                : "block font-sans text-sm antialiased font-bold leading-normal text-red-500"
                            }
                          >
                            {expense.state ? "Pagado" : "Pendiente"}
                          </p>
                        </td>
                        <td className="p-4 border-b border-blue-gray-50">
                          <p
                            className={
                              expense.state
                                ? "block font-sans text-sm antialiased font-bold leading-normal rounded-md bg-sih-green cursor-pointer w-36 text-center"
                                : "block font-sans text-sm antialiased font-bold leading-normal text-gray-600"
                            }
                          >
                            {expense.state ? (
                              <span onClick={() => generatePdf(expense.id)}>
                                Generar factura
                              </span>
                            ) : (
                              <Link href="/acciones/expensas">Ir a pagar</Link>
                            )}
                          </p>
                        </td>
                      </tr>
                    );
                  })
                : null}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default OwnerBills;
