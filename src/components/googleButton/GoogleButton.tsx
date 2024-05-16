"use client";

import Image from "next/image";

const GoogleButton = () => {
  return (
    <a
      href="https://sih-back.onrender.com/auth/google/login"
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
    </a>
  );
};

export default GoogleButton;
