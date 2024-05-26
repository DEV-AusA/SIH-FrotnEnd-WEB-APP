"use client";
import Logo from "./logo/Logo";
import NavBar from "./navBar/NavBar";
import Hamburger from "./hamburger/Hamburger";
import AuthMenu from "./authMenu/AuthMenu";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const Header: React.FC = (): React.ReactElement => {
  const [open, setOpen] = useState(false);
  const refOne = useRef<HTMLImageElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        refOne.current &&
        !refOne.current.contains(e.target as Node) &&
        modalRef.current &&
        !modalRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside, false);

    return () => {
      document.removeEventListener("click", handleClickOutside, false);
    };
  }, []);

  const iconClick = () => {
    setOpen(!open);
  };

  return (
    <header className="min-h-28 px-[200px] bg-[#384B59] flex flex-col items-center max-2xl:px-[50px] justify-center  relative">
      <div className="w-full flex items-center justify-between">
        <Logo />
        <NavBar />
        <div className="relative">
          <Image
            onClick={iconClick}
            ref={refOne}
            className="max-xl:hidden cursor-pointer"
            width={60}
            height={60}
            src="https://i.ibb.co/xFwM7yh/user-Icon2.png"
            alt="Secure Ingress Home"
          />
          <div
            ref={modalRef}
            className={`absolute top-full mt-2 left-1/2 transform -translate-x-1/2 w-[180px] bg-sih-blue rounded shadow-lg z-50 transition-transform duration-500 ease-in-out ${
              open ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
            }`}
          >
            <AuthMenu />
          </div>
        </div>
        <Hamburger />
      </div>
    </header>
  );
};

export default Header;
