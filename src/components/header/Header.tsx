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

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (refOne.current && !refOne.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside, false);

    return () => {
      document.removeEventListener("click", handleClickOutside, false);
    };
  }, [open]);

  const iconClick = () => {
    setOpen(!open);
  };

  return (
    <header
      className={`${open ? "min-h-28 px-[200px] bg-[#384B59] flex flex-col items-center max-2xl:px-[50px] justify-center pt-[25px]" : "min-h-28 px-[200px] bg-[#384B59] flex flex-col items-center max-2xl:px-[50px] justify-center"}`}
    >
      <div className="w-full flex items-center justify-between">
        <Logo />
        <NavBar />
        <Image
          onClick={iconClick}
          ref={refOne}
          className="max-xl:hidden cursor-pointer"
          width={60}
          height={60}
          src="https://i.ibb.co/xFwM7yh/user-Icon2.png"
          alt="Secure Ingress Home"
        />
        <Hamburger />
      </div>
      <div className="w-full max-xl:hidden">{open && <AuthMenu />}</div>
    </header>
  );
};

export default Header;
