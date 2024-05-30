import Image from "next/image";

const CompaniesBanner: React.FC = (): React.ReactElement => {
  const Companies = [
    { image: "/icons/seguridad1.jpeg" },
    { image: "/icons/seguridad2.png" },
    { image: "/icons/seguridad3.png" },
    { image: "/icons/seguridad4.jpeg" },
    { image: "/icons/seguridad5.png" },
    { image: "/icons/seguridad6.jpeg" },
  ];
  return (
    <div className="w-full flex flex-col bg-white  items-center px-[200px] py-[80px] max-[1330px]:px-[50px]">
      <h2 className="text-[#384B59] text-4xl font-bold text-center px-[160px] max-[1330px]:px-0 max-md:text-[20px] max-[500px]:text-base">
        Cada vez son más compañías que confían en nuestro sistema para mejorar
        su seguridad y la experiencia de sus residentes.
      </h2>
      <div className=" w-full flex justify-center flex-wrap items-center">
        {Companies.map((company, i) => {
          return (
            <div
              key={i}
              className="h-[150px] w-[150px] m-3 flex justify-center flex-col items-center mx-[50px] mt-[50px] max-md:h-[100px] max-md:w-[100px]"
            >
              <Image
                src={company.image}
                height={110}
                width={110}
                alt="Imagen de compañía"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default CompaniesBanner;
