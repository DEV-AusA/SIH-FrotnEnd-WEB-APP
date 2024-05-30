const BannerText: React.FC = (): React.ReactElement => {
  return (
    <div className="w-full flex flex-col   px-[200px] pt-[40px] max-large:px-[100px] max-[600px]:px-[50px]">
      <h2 className="text-[#384B59] text-4xl font-bold text-center max-[1400px]:text-2xl max-[800px]:text-xl">
        Tu seguridad es lo más importante
      </h2>
      <p className="text-sih-blue py-[30px] w-auto text-xl mb-[50px] text-justify max-[1400px]:text-lg max-[900px]:text-sm">
        Y nunca se es lo suficientemente prevenido. Con SIH tendrás el control
        de quien entra a tu barrio, generando un código único que le puedes
        compartir a tu invitado y este será validado por el personal de
        seguridad en cuestión de segundos, evitando así largas e incómodas
        esperas. <br /> <br />
        Otra ventaja de usar nuestra aplicación es que podrás pagar todos los
        gastos comunes o expensas de tu barrio desde un solo lugar, llevando así
        un mejor control de tus gastos. <br /> <br />
        ¿Occurió una emergencia? Con un par de clicks te pondrás en contacto con
        el personal de seguridad a través de nuestro chat en tiempo real.
      </p>
    </div>
  );
};
export default BannerText;
