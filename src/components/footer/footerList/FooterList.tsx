import links from "@/helpers/links";
import Link from "next/link";

const FooterList: React.FC = (): React.ReactElement => {
  return (
    <ul className="flex items-center justify-center px-16 max-xl:hidden">
      {links.map((link) => {
        return (
          <>
            {link !== links[0] ? <span>|</span> : ""}

            <Link
              href={link.href}
              key={link.name}
              className="text-xs text-[#FFBD5C] hover:text-[#ffffff] mx-5"
            >
              {link.text}
            </Link>
          </>
        );
      })}
    </ul>
  );
};
export default FooterList;
