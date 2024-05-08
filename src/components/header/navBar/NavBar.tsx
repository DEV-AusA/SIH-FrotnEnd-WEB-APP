"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import links from "@/helpers/links";

const NavBar: React.FC = (): React.ReactElement => {
  const pathname = usePathname();
  return (
    <ul className="w-full max-xl:hidden flex items-center justify-between px-16">
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
  );
};
export default NavBar;
