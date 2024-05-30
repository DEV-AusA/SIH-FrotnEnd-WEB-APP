const BannerText: React.FC = (): React.ReactElement => {
  return (
    <div className="w-full flex flex-col   px-[200px] pt-[40px] max-large:px-[100px] max-[600px]:px-[50px]">
      <h2 className="text-[#384B59] text-4xl font-bold text-center max-[1400px]:text-2xl max-[800px]:text-xl">
        ¿Administras un barrio privado?
      </h2>
      <p className="text-sih-blue py-[30px] w-auto text-xl mb-[50px] text-justify max-[1400px]:text-lg max-[1180px]:text-sm">
        Sabemos lo tedioso que es guardar la información de los residentes en
        carpetas que se pueden perder o dañar, ¿Por qué no usar nuestra bases de
        datos con filtros combinados para poder acceder, en pocos clicks, a toda
        la información, no solo de tus residentes, también de todo el personal
        de seguridad. <br /> <br /> ¿Cansado de tener que recordar el pago de
        los gastos comunes o de pedir el comprobante de transferencia? Genera
        cupones de pagos generales o específicos desde el panel de
        administrador. <br />
        <br />
        ¿Necesitas compartir información importante a los residentes?
        Simplemente accede a nuestra ventana de anuncios parroquiales y te
        aseguramos que todos estarán enterados de las novedades
      </p>
    </div>
  );
};
export default BannerText;
