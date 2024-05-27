const BannerText: React.FC = (): React.ReactElement => {
  return (
    <div className="w-full flex flex-col  items-center px-[200px] py-24 max-large:px-[100px] max-[415px]:px-[50px]">
      <h2 className="text-[#384B59] text-4xl font-bold text-center max-[1400px]:text-2xl max-[800px]:text-xl">
        Facilitamos tareas administrativas, da tranquilidad a tus residentes y
        genera cobros desde la comodidad de tu casa de forma agil.
      </h2>
    </div>
  );
};
export default BannerText;
