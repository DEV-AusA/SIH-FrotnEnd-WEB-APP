import Image from "next/image";

const CompaniesBanner: React.FC = (): React.ReactElement => {
  return (
    <div className="w-full bg-white flex">
      <div className="w-1/3 h-60">
        <Image
          className="w-full h-full object-cover"
          width={600}
          height={100}
          src="/icons/companiesBanner.png"
          alt="Secure Ingress Home"
        />
      </div>
      <div className="w-2/3 p-10">
        <h2 className="text-[#384B59] text-4xl text-center">
          Cada vez son más compañias que confian en nuestro sistema para mejorar
          su seguridad y la experiencia de sus residentes.
        </h2>
      </div>
    </div>
  );
};
export default CompaniesBanner;
