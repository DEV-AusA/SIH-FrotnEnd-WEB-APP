"use client";
import { useState, useEffect } from "react";
import { useUserContext } from "../UserProvider";
import axios from "axios";
import { IAuthorizationCreated } from "@/helpers/types";

const AUTHORIZATIONS_URL = process.env.NEXT_PUBLIC_API_URL;

const GuestAuthorization: React.FC = (): React.ReactElement => {
  const [authorizations, setAuthorizations] =
    useState<IAuthorizationCreated[]>();
  const { setToken } = useUserContext();

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
  return (
    <div>
      <h2 className="text-[#384B59] text-4xl font-bold text-center px-8 max-md:text-[20px] m-3">
        Invitados
      </h2>
      <div className="flex justify-center">
        {authorizations && authorizations.length > 0
          ? authorizations
              .filter(
                (authorization: IAuthorizationCreated) =>
                  authorization.type === "guest",
              )
              .map((authorization: IAuthorizationCreated) => {
                return (
                  <div
                    key={authorization.id}
                    className="w-[300px] bg-white m-3 flex justify-center flex-col items-center rounded-[15px] mx-[45px] my-[40px] shadow-button text-sih-blue  max-[1600px]:mx-[30px]"
                  >
                    <span>Número: {authorization.number}</span>
                    <span>Código de acceso:{authorization.accessCode}</span>
                    <span>Nombre: {authorization.name}</span>
                    {authorization.document ? (
                      <span>Documento: {authorization.document}</span>
                    ) : (
                      ""
                    )}
                    {authorization.shipmentNumber ? (
                      <span>
                        Referencia de envio: {authorization.shipmentNumber}
                      </span>
                    ) : (
                      ""
                    )}
                  </div>
                );
              })
          : ""}
      </div>
    </div>
  );
};

export default GuestAuthorization;
