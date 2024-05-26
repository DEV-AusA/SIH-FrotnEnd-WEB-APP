import Link from "next/link";

const BannerText: React.FC = (): React.ReactElement => {
  return (
    <div className="w-full flex flex-col  items-center px-[200px] py-24 max-large:px-[100px] max-[415px]:px-[50px]">
      <h2 className="text-[#384B59] text-4xl font-bold text-center max-[1400px]:text-2xl max-[800px]:text-xl">
        Con{" "}
        <span className="text-[#FFBD5C] text-[40px] text-left max-[1400px]:text-2xl">
          SIH
        </span>{" "}
        disfruta de tu hogar de la forma más segura posible!
      </h2>
      <h3 className="text-[#384B59] text-2xl my-10 text-left max-[1400px]:text-xl max-medium:text-lg max-[800px]:text-base">
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
