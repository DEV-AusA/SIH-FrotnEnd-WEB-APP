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
    <div className="lg:hidden">
      <Image
        onClick={HamburgerClick}
        width={50}
        height={50}
        src="/icons/hamburger.png"
        alt="Secure Ingress Home"
      />
      <div
        className={`${open ? "h-full bg-[#384B59] fixed right-0 top-0 w-60 z-10 border-l-2 border-slate-500" : "hidden"}`}
      >
        <button
          className="block p-6 text-[#FFBD5C] text-3xl font-bold"
          onClick={HamburgerClick}
        >
          X
        </button>
        <Image
          className="grid grid-cols-1 place-self-center"
          width={50}
          height={50}
          src="/icons/UserIcon.png"
          alt="Secure Ingress Home"
        />
        <ul className="grid grid-cols-1 place-content-center">
          {links.map((link) => {
            return (
              <Link
                href={link.href}
                key={link.name}
                className={`text-xl hover:text-[#FFBD5C]

                        ${pathname === link.href ? "cursor-default text-[#FFBD5C] disabled" : ""}`}
              >
                {link.text}
              </Link>
            );
          })}
        </ul>
      </div>
    </div>
  );
};
export default Hamburger;
