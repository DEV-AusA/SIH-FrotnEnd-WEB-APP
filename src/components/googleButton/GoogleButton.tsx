"use client";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import Image from "next/image";

const GoogleButton = () => {
  const login = useGoogleLogin({
    onSuccess: async (response) => {
      try {
        const res = await axios.get(
          "https://www.googleapis.com/oauth2/v3/userinfo",
          { headers: { Authorization: `Bearer ${response.access_token}` } },
        );
        console.log(res);
        console.log(response);
      } catch (error) {
        error;
      }
    },
  });

  return (
    <button
      onClick={() => login()}
      className="bg-[#4385F5] h-[36px] w-[200px] rounded-[15px] text-base  flex items-center justify-between"
    >
      <Image
        className="bg-white h-full border-2 border-[#4385F5] p-1 rounded-l-[15px]"
        width={36}
        height={30}
        src="/icons/google.png"
        alt="Secure Ingress Home"
      />
      <span className="pr-3">Ingresa con Google</span>
    </button>
  );
};

export default GoogleButton;
