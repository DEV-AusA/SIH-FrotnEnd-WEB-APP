"use client";
import Logo from "./logo/Logo";
import NavBar from "./navBar/NavBar";
import UserIcon from "./userIcon/UserIcon";
import Hamburger from "./hamburger/Hamburger";
import AuthMenu from "./authMenu/AuthMenu";
import { useState } from "react";

const Header: React.FC = (): React.ReactElement => {
  const [open, setOpen] = useState(false);

  const iconClick = () => {
    if (open) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  };
  return (
    <header className=" min-h-28 px-[200px] bg-[#384B59] flex flex-col items-center">
      <div className="w-full flex items-center justify-between mt-6">
        <Logo />
        <NavBar />
        <button onClick={iconClick} className="">
          <UserIcon />
        </button>
        <Hamburger />
      </div>
      <div className="w-full max-xl:hidden">{open && <AuthMenu />}</div>
    </header>
  );
};
export default Header;
