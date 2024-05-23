"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useUserContext } from "../UserProvider";
import { IProperty } from "@/helpers/types";
import Image from "next/image";
import Link from "next/link";

const GETPROPERTIES_URL = process.env.NEXT_PUBLIC_API_URL;

const AdminProperties: React.FC = (): React.ReactElement => {
  const [occupied, setOccupied] = useState(false);
  const [unoccupied, setUnoccupied] = useState(false);
  const [properties, setProperties] = useState<IProperty[]>([]);
  const { setToken } = useUserContext();
  useEffect(() => {
    const fetchProperties = async () => {
      const storedToken = await localStorage.getItem("token");
      setToken(storedToken);

      const response = await axios.get(`${GETPROPERTIES_URL}/properties`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      });
      setProperties(response.data);
    };

    fetchProperties();
  }, []);
  const handleUnoccupied = () => {
    setUnoccupied(!unoccupied);
    if (occupied) {
      setOccupied(!occupied);
    }
  };
  const handleOccupied = () => {
    setOccupied(!occupied);
    if (unoccupied) {
      setUnoccupied(!unoccupied);
    }
  };
  const unoccupiedProperties: IProperty[] = properties.filter(
    (property) => property.user === null,
  );
  const occupiedProperties: IProperty[] = properties.filter(
    (property) => property.user !== null,
  );

  return (
    <main className="flex flex-col items-center pb-10 pt-[10px]">
      <form action="">
        <input
          type="text"
          placeholder="Buscar por número de casa..."
          className="text-black h-[40px] w-[256px] bg-white rounded-[15px] px-2 outline-0 m-[10px]"
        />
      </form>
      <div className="flex justify-center items-center mt-[5px]">
        <button
          onClick={handleOccupied}
          className={
            occupied
              ? "w-[120px] mx-[10px] bg-sih-orange text-sih-blue p-[6px] rounded-[10px] text-center"
              : "w-[120px] mx-[10px] bg-sih-blue p-[6px] rounded-[10px] text-center hover:bg-sih-orange hover:text-sih-blue"
          }
        >
          Ocupadas
        </button>
        <button
          onClick={handleUnoccupied}
          className={
            unoccupied
              ? "w-[120px] mx-[10px] bg-sih-orange text-sih-blue p-[6px] rounded-[10px] text-center"
              : "w-[120px] mx-[10px] bg-sih-blue p-[6px] rounded-[10px] text-center hover:bg-sih-orange hover:text-sih-blue"
          }
        >
          Desocupadas
        </button>
      </div>
      <div className="flex flex-wrap justify-center items-center px-[200px] max-2xl:px-[50px]">
        {properties ? (
          unoccupied ? (
            unoccupiedProperties.map((property: IProperty) => {
              return (
                <div
                  key={property.id}
                  className="h-auto w-auto bg-white m-3 flex justify-center flex-col items-center rounded-[15px] mx-[20px] my-[30px] shadow-button text-sih-blue"
                >
                  <Image
                    className="w-[270px] h-[150px] rounded-t-[15px]"
                    src={property.image}
                    width={270}
                    height={150}
                    alt="Frente de la propiedad"
                  />
                  <span className="my-[2px] mt-[5px]">
                    <b>Número de casa:</b> {property.number}
                  </span>
                  <span className="my-[2px]">
                    <b>Dirección:</b> {property.address}
                  </span>
                  <span className="my-[2px]">
                    <b>Codigo de vivienda:</b> {property.code}
                  </span>
                  {property.user ? (
                    <span className="my-[2px]">
                      <b>Propietario: </b>
                      {property.user?.name} {property.user?.lastName}
                    </span>
                  ) : (
                    <span className="mb-[10px] text-sih-green">
                      <b>Desocupada</b>
                    </span>
                  )}
                  {property.user ? (
                    <Link
                      href=""
                      className="bg-sih-blue text-white my-[10px] mx-[10px] py-[5px] w-[250px] text-center rounded-[10px] hover:bg-sih-orange hover:text-sih-blue"
                    >
                      Crear expensa extraordinaria
                    </Link>
                  ) : null}
                </div>
              );
            })
          ) : occupied ? (
            occupiedProperties.map((property: IProperty) => {
              return (
                <div
                  key={property.id}
                  className="h-auto w-auto bg-white m-3 flex justify-center flex-col items-center rounded-[15px] mx-[20px] my-[30px] shadow-button text-sih-blue"
                >
                  <Image
                    className="w-[270px] h-[150px] rounded-t-[15px]"
                    src={property.image}
                    width={270}
                    height={150}
                    alt="Frente de la propiedad"
                  />
                  <span className="my-[2px] mt-[5px]">
                    <b>Número de casa:</b> {property.number}
                  </span>
                  <span className="my-[2px]">
                    <b>Dirección:</b> {property.address}
                  </span>
                  <span className="my-[2px]">
                    <b>Codigo de vivienda:</b> {property.code}
                  </span>
                  {property.user ? (
                    <span className="my-[2px]">
                      <b>Propietario: </b>
                      {property.user?.name} {property.user?.lastName}
                    </span>
                  ) : (
                    <span className="mb-[10px] text-sih-green">
                      <b>Desocupada</b>
                    </span>
                  )}
                  {property.user ? (
                    <Link
                      href=""
                      className="bg-sih-blue text-white my-[10px] mx-[10px] py-[5px] w-[250px] text-center rounded-[10px] hover:bg-sih-orange hover:text-sih-blue"
                    >
                      Crear expensa extraordinaria
                    </Link>
                  ) : null}
                </div>
              );
            })
          ) : (
            properties.map((property: IProperty) => {
              return (
                <div
                  key={property.id}
                  className="h-auto w-auto bg-white m-3 flex justify-center flex-col items-center rounded-[15px] mx-[20px] my-[30px] shadow-button text-sih-blue"
                >
                  <Image
                    className="w-[270px] h-[150px] rounded-t-[15px]"
                    src={property.image}
                    width={270}
                    height={150}
                    alt="Frente de la propiedad"
                  />
                  <span className="my-[2px] mt-[5px]">
                    <b>Número de casa:</b> {property.number}
                  </span>
                  <span className="my-[2px]">
                    <b>Dirección:</b> {property.address}
                  </span>
                  <span className="my-[2px]">
                    <b>Codigo de vivienda:</b> {property.code}
                  </span>
                  {property.user ? (
                    <span className="my-[2px]">
                      <b>Propietario: </b>
                      {property.user?.name} {property.user?.lastName}
                    </span>
                  ) : (
                    <span className="mb-[10px] text-sih-green">
                      <b>Desocupada</b>
                    </span>
                  )}
                  {property.user ? (
                    <Link
                      href=""
                      className="bg-sih-blue text-white my-[10px] mx-[10px] py-[5px] w-[250px] text-center rounded-[10px] hover:bg-sih-orange hover:text-sih-blue"
                    >
                      Crear expensa extraordinaria
                    </Link>
                  ) : null}
                </div>
              );
            })
          )
        ) : (
          <div>Aun no hay propiedades registradas</div>
        )}
      </div>
    </main>
  );
};
export default AdminProperties;
