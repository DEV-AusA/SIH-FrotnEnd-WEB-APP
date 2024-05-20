"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useUserContext } from "../UserProvider";
import { IProperty } from "@/helpers/types";

const GETPROPERTIES_URL = process.env.NEXT_PUBLIC_API_URL;

const AdminProperties: React.FC = (): React.ReactElement => {
  const [properties, setProperties] = useState<IProperty[]>([]);
  const { token, setToken } = useUserContext();
  useEffect(() => {
    const fetchProperties = async () => {
      const storedToken = await localStorage.getItem("token");
      setToken(storedToken);

      axios
        .get(`${GETPROPERTIES_URL}/properties`, {
          headers: { Authorization: `Hola ${token}` },
        })
        .then(({ data }) => data)
        .then((data) => {
          console.log(data);
          setProperties(data);
        })
        .catch((error) => console.log(error));
    };

    fetchProperties();
  }, []);
  console.log(properties);

  return (
    <main className="flex flex-col items-center py-10">
      <h2 className="text-[#384B59] text-4xl font-bold text-center px-8 max-md:text-[20px] m-3">
        Propiedades
      </h2>
      <div className="flex flex-wrap justify-center items-center px-[200px] max-2xl:px-[50px]">
        {properties ? (
          properties.map((property: IProperty) => {
            return (
              <div
                key={property.id}
                className="h-[100px] w-[300px] bg-white m-3 flex justify-center flex-col items-center rounded-[15px] mx-[30px] my-[40px] shadow-button text-sih-blue"
              >
                <span>Dirección: {property.address}</span>
                <span>Número de casa: {property.number}</span>
                <span>Codigo de vivienda: {property.code}</span>
              </div>
            );
          })
        ) : (
          <div>Aun no hay propiedades registradas</div>
        )}
      </div>
    </main>
  );
};
export default AdminProperties;
