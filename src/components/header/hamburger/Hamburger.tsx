"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import links from "@/helpers/links";
import AuthMenu from "../authMenu/AuthMenu";

const Hamburger: React.FC = (): React.ReactElement => {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);

  const HamburgerClick = () => {
    setOpen(!open);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  return (
    <div>
      <div
        ref={buttonRef}
        className={`${open ? "hidden" : "xl:hidden cursor-pointer"}`}
      >
        <Image
          onClick={HamburgerClick}
          width={50}
          height={50}
          src="/icons/hamburger.png"
          alt="Secure Ingress Home"
        />
      </div>
      <div
        ref={menuRef}
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
            {links.map((link) => (
              <li key={link.name}>
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={`text-xl my-2 hover:text-[#FFBD5C] ${
                    pathname === link.href
                      ? "cursor-default text-[#FFBD5C] disabled"
                      : ""
                  }`}
                >
                  {link.text}
                </Link>
              </li>
            ))}
            <div className="text-center justify-center items-center">
              <AuthMenu />
            </div>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Hamburger;
