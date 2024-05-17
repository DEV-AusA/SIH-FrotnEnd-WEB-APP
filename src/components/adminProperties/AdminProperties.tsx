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
    <main className="flex flex-wrap">
      {properties.map((property: IProperty) => {
        return (
          <div
            key={property.id}
            className="text-black flex flex-col m-5 border-2 border-black"
          >
            <span>{property.address}</span>
            <span>{property.number}</span>
            <span>{property.code}</span>
          </div>
        );
      })}
    </main>
  );
};
export default AdminProperties;
