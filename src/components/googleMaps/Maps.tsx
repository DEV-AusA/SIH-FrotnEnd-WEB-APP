"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
const API_URL = process.env.NEXT_PUBLIC_API_URL;
export function Maps() {
  const [text, setText] = useState<string | undefined>(undefined);
  useEffect(() => {
    const getData = async () => {
      const storedToken = localStorage.getItem("token");
      const response = await axios.get(`${API_URL}/establishment`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      });
      setText(response.data[0]?.location);
    };
    getData();
  }, []);
  return (
    <div className="flex flex-col justify-center items-center">
      <h2 className="text-[#384B59] text-4xl font-bold text-center max-[1400px]:text-2xl max-[800px]:text-xl mb-[50px]">
        Ubicación del barrio de la comunidad
      </h2>
      <div className="h-[500px] w-[70%] border-4 border-white mb-[50px] rounded-[10px]">
        <iframe
          src={text}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen={true}
          loading="lazy"
        ></iframe>
      </div>
    </div>
  );
}
