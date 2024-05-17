"use client";
import { useUserContext } from "@/components/UserProvider";
import { useState, useEffect, FormEvent, ChangeEvent } from "react";
import axios from "axios";
import { IExpense } from "@/helpers/types";
import Swal from "sweetalert2";

const EXPENSES_URL = process.env.NEXT_PUBLIC_API_URL;

const ExpensesAdmin: React.FC = (): React.ReactElement => {
  const [expenses, setExpenses] = useState<IExpense[]>([]);
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

        const response = await axios.get(`${EXPENSES_URL}/expenses`, {
          headers: { Authorization: `Hola ${token}` },
        });

        setExpenses(response.data);
      } catch (error) {
        console.log("Error al obtener las expensas:", error);
        setExpenses([]);
      }
    };

    fetchExpenses();
  }, []);
  const createExpense = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(amount);
    axios
      .post(
        `${EXPENSES_URL}/expenses/createAllExpenses`,
        { amount: amount },
        {
          headers: { Authorization: `Hola ${token}` },
        },
      )
      .then(() =>
        axios
          .get(`${EXPENSES_URL}/expenses`, {
            headers: { Authorization: `Hola ${token}` },
          })
          .then(({ data }) => setExpenses(data)),
      )
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
    <main className="flex flex-col items-center py-10">
      <h2 className="text-[#384B59] text-4xl font-bold text-center px-8 max-md:text-[20px] m-3">
        Expensas
      </h2>
      <div className="flex flex-wrap">
        {expenses && expenses.length > 0 ? (
          expenses.map((expense: IExpense) => {
            return (
              <div
                key={expense.id}
                className="w-[300px] bg-white m-3 flex justify-center flex-col items-center rounded-[15px] mx-[45px] my-[40px] shadow-button text-sih-blue"
              >
                <span className="m-2">
                  Generado en: {expense.dateGenerated}
                </span>
                <span className="m-2">Valor a pagar: {expense.amount}</span>
                <span className="m-2">
                  {expense.state ? "Pagado" : "Pendiente"}
                </span>
                {expense.numberOperation && (
                  <span className="m-2">
                    Confirmación de pago: {expense.numberOperation}
                  </span>
                )}
                {expense.datePaid && (
                  <span className="m-2">Pagado en: {expense.datePaid}</span>
                )}
              </div>
            );
          })
        ) : (
          <div className="text-black">Aun no hay expensas registradas</div>
        )}
      </div>

      <form
        onSubmit={createExpense}
        className="bg-white m-3 flex justify-center flex-col items-center rounded-[15px]"
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
    </main>
  );
};
export default ExpensesAdmin;
