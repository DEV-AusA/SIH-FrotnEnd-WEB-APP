const BannerText: React.FC = (): React.ReactElement => {
  return (
    <div className="w-full flex flex-col  items-center px-[200px] py-24 max-large:px-[100px] max-[600px]:px-[50px]">
      <h2 className="text-[#384B59] text-4xl font-bold text-center max-[1400px]:text-2xl max-[800px]:text-xl">
        Acercate a tus seres queridos, agenda visitas con facilidad y genera los
        pagos relacionados a tu hogar desde la comodidad de tu casa!
      </h2>
    </div>
  );
};
export default BannerText;
