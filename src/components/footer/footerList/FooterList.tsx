import Image from "next/image";
import Link from "next/link";

const FooterList: React.FC = (): React.ReactElement => {
  return (
    <>
      <ul className="flex flex-col  text-start px-16 max-xl:hidden text-xs text-[#FFBD5C] mx-5">
        <Link className="hover:text-[#ffffff]" href="/">
          Inicio
        </Link>
        <Link className="hover:text-[#ffffff] my-[5px]" href="/contacto">
          Contacto
        </Link>
        <Link className="hover:text-[#ffffff]" href="/ingreso">
          Ingreso
        </Link>
      </ul>
      <ul className="flex flex-col  text-start px-16 max-xl:hidden text-xs text-[#FFBD5C] mx-5">
        <span>Tecnologías aplicadas:</span>
        <a
          className="hover:text-[#ffffff] my-[5px]"
          href="https://nextjs.org/"
          target="blank"
        >
          Next.JS
        </a>
        <a
          className="hover:text-[#ffffff]"
          href="https://nestjs.com/"
          target="blank"
        >
          Nest.JS
        </a>
      </ul>
      <ul className="flex flex-col  text-start px-16 max-xl:hidden text-xs text-[#FFBD5C] mx-5">
        <Link className="hover:text-[#ffffff]" href="/sobre-nosotros">
          Sobre nosotros
        </Link>
        <span className="my-[5px]">Redes sociales:</span>
        <div className="flex justify-center">
          <Link href="/sobre-nosotros" className="h-auto w-auto mr-[5px]">
            <Image src="/icons/orangeGh.png" alt="" width={28} height={28} />
          </Link>
          <Link href="/sobre-nosotros" className="h-auto w-auto ml-[5px]">
            <Image src="/icons/orangeLk.png" alt="" width={28} height={28} />
          </Link>
        </div>
      </ul>
    </>
  );
};
export default FooterList;
