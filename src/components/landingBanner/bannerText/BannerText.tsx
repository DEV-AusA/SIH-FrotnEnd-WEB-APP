import Link from "next/link";

const BannerText: React.FC = (): React.ReactElement => {
  return (
    <div className="w-full flex flex-col  items-center px-[200px] py-24 ">
      <h2 className="text-[#384B59] text-4xl font-bold text-center">
        Con <span className="text-[#FFBD5C] text-[40px] text-left">SIH</span>{" "}
        disfruta de tu hogar de la forma más segura posible!
      </h2>
      <h3 className="text-[#384B59] text-2xl my-10 text-left">
        -Control de ingreso
        <br />
        -Comunicación las 24hrs con la guardia
        <br />
        -Realiza tus pagos administrativos
      </h3>
      <Link
        href="/residente"
        className="bg-[#384B59] w-[200px] h-[60px] mt-5 text-center justify-center items-center flex rounded-xl text-2xl hover:bg-[#FFBD5C] hover:text-[#384B59]"
      >
        Saber más
      </Link>
    </div>
  );
};
export default BannerText;
