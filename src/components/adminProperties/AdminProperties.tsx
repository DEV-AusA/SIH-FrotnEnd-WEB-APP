"use client";

import axios from "axios";
import { useEffect } from "react";

const REGISTERUSER_URL = process.env.NEXT_PUBLIC_API_URL;

const AdminProperties: React.FC = (): React.ReactElement => {
  useEffect(() => {
    const getProperties = async () => {
      axios
        .get(`${REGISTERUSER_URL}/properties`)
        .then((data) => console.log(data));
      //error de autorizacion
    };
    getProperties();
  });
  return <main></main>;
};
export default AdminProperties;
