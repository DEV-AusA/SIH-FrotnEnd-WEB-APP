"use client";
import { useState, useEffect } from "react";
import { useUserContext } from "../UserProvider";
import axios from "axios";
import { IAuthorizationCreated, CustomError } from "@/helpers/types";
import Swal from "sweetalert2";

const AUTHORIZATIONS_URL = process.env.NEXT_PUBLIC_API_URL;

const PackageAuthorization: React.FC = (): React.ReactElement => {
  const [foundAuthorization, setFoundAuthorization] =
    useState<IAuthorizationCreated>();
  const [authorizations, setAuthorizations] =
    useState<IAuthorizationCreated[]>();
  const { setToken, token, user } = useUserContext();
  const validateAuth = async (number: number) => {
    try {
      await axios.put(
        `${AUTHORIZATIONS_URL}/authorizations/${user?.id}`,
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

        setAuthorizations(response.data);
        console.log(response.data);
      } catch (error) {
        console.log("Error al obtener las expensas:", error);
        setAuthorizations([]);
        console.log(authorizations);
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
          <span>Número: {foundAuthorization.number}</span>
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
    </div>
  );
};

export default PackageAuthorization;
