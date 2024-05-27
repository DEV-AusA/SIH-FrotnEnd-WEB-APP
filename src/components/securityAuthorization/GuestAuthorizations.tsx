"use client";
import { useState, useEffect } from "react";
import { useUserContext } from "../UserProvider";
import axios from "axios";
import { CustomError, IAuthorizationCreated } from "@/helpers/types";
import Swal from "sweetalert2";

const AUTHORIZATIONS_URL = process.env.NEXT_PUBLIC_API_URL;

const GuestAuthorization: React.FC = (): React.ReactElement => {
  const [foundAuthorization, setFoundAuthorization] =
    useState<IAuthorizationCreated>();
  const [authorizations, setAuthorizations] =
    useState<IAuthorizationCreated[]>();
  const { setToken, token, setUser } = useUserContext();
  const validateAuth = async (number: number) => {
    try {
      const storedUser = await JSON.parse(localStorage.user);
      setUser(storedUser);
      await axios.put(
        `${AUTHORIZATIONS_URL}/authorizations/${storedUser.id}`,
        { code: number },
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Ingreso registrado!",
        showConfirmButton: true,
      }).then(() => location.reload());
      return;
    } catch (error) {
      const typedError = error as CustomError;
      Swal.fire({
        icon: "error",
        title: typedError.response?.data?.message || typedError.message,
        showConfirmButton: true,
      });
    }
  };

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const storedToken = await localStorage.getItem("token");
        setToken(storedToken);

        const response = await axios.get(
          `${AUTHORIZATIONS_URL}/authorizations`,
          {
            headers: { Authorization: `Bearer ${storedToken}` },
          },
        );
        console.log(response.data);

        setAuthorizations(response.data);
      } catch (error) {
        console.log("Error al obtener las expensas:", error);
        setAuthorizations([]);
      }
    };

    fetchExpenses();
  }, []);
  const handleSearch = async () => {
    const searchBar = document.getElementById("search") as HTMLInputElement;
    try {
      const response = await axios.get(
        `${AUTHORIZATIONS_URL}/authorizations/${searchBar.value}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      console.log(response.data);
      if (response.data.type === "guest") setFoundAuthorization(response.data);
      else
        Swal.fire({
          icon: "error",
          title: "No se ha encontrado ninguna autorización.",
          showConfirmButton: true,
        });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "No se ha encontrado ninguna autorización.",
        showConfirmButton: true,
      });
    }
  };
  const dateTimeConvert = (dateTime: string) => {
    const date = new Date(dateTime);

    const formattedDate = date.toISOString().split("T")[0]; // "2024-05-24"
    const formattedTime = date.toISOString().split("T")[1].split(".")[0];

    return formattedDate + " \n " + formattedTime;
  };

  return (
    <div className="flex flex-col items-center pb-[5px]">
      <h2 className="text-[#384B59] text-4xl font-bold text-center px-8 max-md:text-[20px] m-3">
        Invitados
      </h2>
      <input
        id="search"
        type="number"
        placeholder="Código de acceso"
        className="text-black h-[40px] w-[256px] bg-white rounded-[15px] px-2 outline-0 m-[10px]"
      />
      <button
        onClick={handleSearch}
        className="w-[120px] mx-[10px] bg-sih-blue p-[6px] rounded-[10px] text-center hover:bg-sih-orange hover:text-sih-blue"
      >
        Buscar
      </button>
      {foundAuthorization && foundAuthorization.type === "guest" ? (
        <div
          key={foundAuthorization.id}
          className="w-[300px] bg-white m-3 p-5 flex justify-center flex-col items-center rounded-[15px] mx-[45px] my-[40px] shadow-button text-sih-blue  max-[1600px]:mx-[30px]"
        >
          <span>Código de acceso:{foundAuthorization.accessCode}</span>
          <span>Nombre: {foundAuthorization.name}</span>
          {foundAuthorization.document ? (
            <span>Documento: {foundAuthorization.document}</span>
          ) : (
            ""
          )}
          {foundAuthorization.shipmentNumber ? (
            <span>
              Referencia de envio: {foundAuthorization.shipmentNumber}
            </span>
          ) : (
            ""
          )}
          <span>Número de casa: {foundAuthorization.numberProp}</span>
          <span>Dirección: {foundAuthorization.addressProp}</span>
          <span>
            Propietario: {foundAuthorization.nameProp}{" "}
            {foundAuthorization.lastNameProp}
          </span>
          {foundAuthorization.dateUsed ? (
            <span>Validado</span>
          ) : (
            <button
              className="bg-sih-blue text-white mt-[10px] mb-[15px] mx-[10px] py-[5px] w-[250px] text-center rounded-[10px] hover:bg-sih-orange hover:text-sih-blue"
              onClick={() => validateAuth(foundAuthorization.accessCode)}
            >
              Registrar Ingreso
            </button>
          )}
        </div>
      ) : (
        ""
      )}
      <div className="m-auto my-5 relative flex flex-col w-4/5 h-full text-gray-700 bg-white shadow-md rounded-xl bg-clip-border">
        <div className="p-6 px-0 overflow-scroll h-[600px]">
          <h2 className="text-[#384B59] text-4xl font-bold text-center px-8 max-md:text-[20px] m-3">
            Últimos ingresos registrados
          </h2>
          <table className="w-full mt-4 text-left table-auto min-w-max">
            <thead>
              <tr>
                <th className="w-[200px] p-4 border-y border-blue-gray-100 bg-blue-gray-50/50">
                  <p className="block font-sans text-sm antialiased font-bold leading-none ">
                    Número de authorización
                  </p>
                </th>
                <th className=" w-[200px] p-4 border-y border-blue-gray-100 bg-blue-gray-50/50">
                  <p className="block font-sans text-sm antialiased font-bold  leading-none">
                    Código de acceso
                  </p>
                </th>
                <th className="w-[200px] p-4 border-y border-blue-gray-100 bg-blue-gray-50/50">
                  <p className="block font-sans text-sm antialiased font-bold  leading-none ">
                    Nombre
                  </p>
                </th>
                <th className="w-[200px] p-4 border-y border-blue-gray-100 bg-blue-gray-50/50">
                  <p className="block font-sans text-sm antialiased font-bold  leading-none">
                    Documento
                  </p>
                </th>
                <th className=" w-[200px] p-4 border-y border-blue-gray-100 bg-blue-gray-50/50">
                  <p className="block font-sans text-sm antialiased font-bold  leading-none">
                    Fecha de validación
                  </p>
                </th>
              </tr>
            </thead>
            <tbody>
              {authorizations
                ?.filter(
                  (auth: IAuthorizationCreated) =>
                    auth.dateUsed && auth.type === "guest",
                )
                .sort(
                  (a, b) =>
                    new Date(b.dateUsed).getTime() -
                    new Date(a.dateUsed).getTime(),
                )
                .slice(0, 10)
                .map((auth: IAuthorizationCreated) => (
                  <tr key={auth.id}>
                    <td className="p-4 border-b border-blue-gray-50">
                      <div className="flex flex-col">
                        <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                          {auth.number}
                        </p>
                      </div>
                    </td>
                    <td className="p-4 border-b border-blue-gray-50">
                      <div className="flex flex-col">
                        <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                          {auth.accessCode}
                        </p>
                      </div>
                    </td>
                    <td className="p-4 border-b border-blue-gray-50">
                      <div className="flex flex-col">
                        <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                          {auth.name}
                        </p>
                      </div>
                    </td>
                    <td className="p-4 border-b border-blue-gray-50">
                      <div className="flex flex-col">
                        <p>{auth.document}</p>
                      </div>
                    </td>
                    <td className="p-4 border-b border-blue-gray-50">
                      <div className="flex flex-col">
                        <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                          {dateTimeConvert(auth.dateUsed)}
                        </p>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default GuestAuthorization;
