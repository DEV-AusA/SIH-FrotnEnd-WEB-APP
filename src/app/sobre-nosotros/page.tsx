import Image from "next/image";

const About: React.FC = (): React.ReactElement => {
  return (
    <div>
      <section className="flex bg-white justify-between">
        <main className="flex flex-col items-center justify-center pl-[200px] mr-[100px] text-sih-blue text-justify">
          <h2 className="text-4xl font-bold text-sih-blue mt-[50px] mb-[40px]">
            Sobre nosotros
          </h2>
          <p className="w-[760px] text-2xl mb-[50px]">
            Secure Ingress Home nace de la iniciativa de brindar soluciones a un
            sector que ha sido ignorado por el mundo tecnológico.
          </p>
          <p className="w-[760px] text-2xl mb-[50px]">
            Largas esperas para ingresar, proceso tedioso e inseguro para dejar
            entrar a los invitados, poca de comunicación entre el personal de
            seguridad y los propietarios y largos trámites para realizar el pago
            de gastos comunos son algunas de las problemáticas que hemos vivido
            como residentes de comunidades cerradas.
          </p>
          <p className="w-[760px] text-2xl mb-[50px]">
            Por ellos nos pusimos manos a la obra, vimos una problemática que
            podíamos solucionar y no solo facilitar nuestras vidas, sino la de
            los residentes de muchas comunidades privadas al rededor del mundo.
          </p>
        </main>
        <Image
          src="/icons/aboutBanner.jpg"
          width={830}
          height={627}
          alt="Familia"
          className="w-auto h-auto"
        ></Image>
      </section>
      {/* <Developers /> */}
    </div>
  );
};

export default About;
