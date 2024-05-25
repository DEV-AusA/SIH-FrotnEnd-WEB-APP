"use client";
import { useUserContext } from "@/components/UserProvider";
import { useState, useEffect, FormEvent, ChangeEvent } from "react";
import axios from "axios";
import { IExpense, OwnerExpense } from "@/helpers/types";
import Swal from "sweetalert2";
const EXPENSES_URL = process.env.NEXT_PUBLIC_API_URL;

const TableExpenses: React.FC = (): React.ReactElement => {
  const [expenses, setExpenses] = useState<IExpense[]>([]);
  const [owners, setOwners] = useState<OwnerExpense[]>([]);
  const [amount, setAmount] = useState<number>();
  const { token, setToken } = useUserContext();

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setAmount(Number(value));
  };
  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const storedToken = await localStorage.getItem("token");
        setToken(storedToken);

        const expenseResponse = await axios.get(`${EXPENSES_URL}/expenses`, {
          headers: { Authorization: `Bearer ${storedToken}` },
        });

        const expenseData = expenseResponse.data;

        // Cargar la información de los usuarios
        const ownerPromises = expenseData.map(async (expense: IExpense) => {
          const response = await axios.get(
            `${EXPENSES_URL}/users/${expense.userProperty}`,
            {
              headers: { Authorization: `Bearer ${storedToken}` },
            },
          );
          return {
            name: response.data.name,
            lastName: response.data.lastName,
            email: response.data.email,
          };
        });

        const ownerData = await Promise.all(ownerPromises);

        setOwners(ownerData);
        setExpenses(expenseData);
      } catch (error) {
        console.log("Error al obtener las expensas:", error);
        setExpenses([]);
      }
    };

    fetchExpenses();
  }, []);
  const createExpense = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    axios
      .post(
        `${EXPENSES_URL}/expenses/createAllExpenses`,
        { amount: amount },
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      )
      .then(() => {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Expensa creada!",
          showConfirmButton: true,
        }).then(() => location.reload());
      })
      .catch((error) => {
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: error.response.data.message,
          showConfirmButton: true,
        });
      });
  };

  return (
    <main className="flex flex-col">
      <div className="flex justify-center">
        <form
          onSubmit={createExpense}
          className="bg-white w-2/3 flex justify-center flex-col items-center rounded-[15px]"
        >
          <h2 className="text-[#384B59] text-4xl font-bold text-center px-8 max-md:text-[20px] m-3">
            Crear expensa para todos los propietarios
          </h2>
          <input
            type="number"
            name="amount"
            id="amount"
            placeholder="Valor a pagar"
            onChange={handleChange}
            className="text-black h-[40px] w-[256px] bg-sih-grey rounded-[15px] px-2 outline-0 mx-5 border-2 border-black"
          />
          <button
            type="submit"
            className="bg-sih-blue h-[37px] w-[200px] rounded-[15px] text-base p-1 mt-[20px] mb-3"
          >
            Crear Expensa
          </button>
        </form>
      </div>

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
                {expenses.map((expense: IExpense, index) => {
                  return (
                    <tr>
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
                        <div className="flex flex-col">
                          <p
                            className={
                              expense.state
                                ? "block font-sans text-sm antialiased font-bold leading-normal text-sih-green"
                                : "block font-sans text-sm antialiased font-bold leading-normal text-red-500"
                            }
                          >
                            {expense.state ? "Pagado" : "Pendiente"}
                          </p>
                        </div>
                      </td>
                      <td className="p-4 border-b border-blue-gray-50">
                        <div className="flex flex-col">
                          <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                            {owners[index]?.name} {owners[index]?.lastName}
                          </p>
                          <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                            {owners[index]?.email}
                          </p>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
};

export default TableExpenses;
