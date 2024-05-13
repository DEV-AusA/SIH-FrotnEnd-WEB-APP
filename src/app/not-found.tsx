import Image from "next/image";
import Link from "next/link";

const Logo: React.FC = (): React.ReactElement => {
  return (
    <div className="h-screen flex flex-col justify items-center bg-white">
      <h2 className="text-[#384B59] text-8xl font-bold text-center mt-[100px]">
        ¡Ups!
      </h2>
      <Image
        className="mt-[50px]"
        src="/icons/404.png"
        width={200}
        height={200}
        alt="404"
      />
      <h3 className="text-[#384B59] text-4xl font-bold text-center mt-[50px]">
        Parece que la página a la que deseas acceder no existe
      </h3>
      <Link
        className="bg-[#384B59] w-[300px] h-[50px] mt-5 rounded-xl text-3xl hover:bg-[#FFBD5C] hover:text-[#384B59] text-center pt-[7px] mt-[50px]"
        href="/"
      >
        Volver al inicio
      </Link>
    </div>
  );
};
export default Logo;
