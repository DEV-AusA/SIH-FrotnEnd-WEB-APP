"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import links from "@/helpers/links";

const Hamburger: React.FC = (): React.ReactElement => {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const HamburgerClick = () => {
    if (open) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  };

  return (
    <div>
      <div className={`${open ? "hidden" : "xl:hidden cursor-pointer"}`}>
        <Image
          onClick={HamburgerClick}
          width={50}
          height={50}
          src="/icons/hamburger.png"
          alt="Secure Ingress Home"
        />
      </div>
      <div
        className={`${open ? "h-full bg-[#384B59] fixed right-0 top-0 w-60 z-10 border-l-2 border-slate-500 flex flex-col text-center xl:hidden" : "hidden"}`}
      >
        <div>
          <button
            className="block p-6 text-[#FFBD5C] text-3xl font-bold"
            onClick={HamburgerClick}
          >
            X
          </button>
        </div>
        <div className="flex flex-col items-center">
          <Image
            width={50}
            height={50}
            src="/icons/UserIcon.png"
            alt="Secure Ingress Home"
          />
          <ul className="flex flex-col my-5">
            {links.map((link) => {
              return (
                <Link
                  href={link.href}
                  key={link.name}
                  className={`text-xl my-2 hover:text-[#FFBD5C]

                        ${pathname === link.href ? "cursor-default text-[#FFBD5C] disabled" : ""}`}
                >
                  {link.text}
                </Link>
              );
            })}
            <Link
              href="/ingreso"
              className={`${pathname === "/ingreso" ? "cursor-default my-2 text-[#FFBD5C] text-xl disabled" : "hover:text-[#FFBD5C] my-2 text-xl"}`}
            >
              Ingresa
            </Link>
            <Link
              href="/registro"
              className={`${pathname === "/registro" ? "cursor-default text-xl my-2 text-[#FFBD5C] disabled" : "hover:text-[#FFBD5C] my-2 text-xl"}`}
            >
              Regístrate
            </Link>
          </ul>
        </div>
      </div>
    </div>
  );
};
export default Hamburger;
