import Developers from "@/components/developers/Developers";
import Image from "next/image";

const About: React.FC = (): React.ReactElement => {
  return (
    <div>
      <section className="flex justify-between px-200 bg-white min-h-[600px] text-sih-blue">
        <main className="w-full flex flex-col  items-center px-[200px] pt-[50px] max-[1540px]:px-[100px] max-[415px]:px-[50px] max-[1050px]:px-[50px]">
          <h2 className="text-4xl font-bold text-sih-blue  mb-[40px] max-[1400px]:text-2xl max-[800px]:text-xl">
            Sobre nosotros
          </h2>
          <p className="w-auto text-xl mb-[50px] text-justify max-[1400px]:text-lg max-[900px]:text-base max-[750px]:text-sm">
            Secure Ingress Home nace de la iniciativa de brindar soluciones a un
            sector que ha sido ignorado por el mundo tecnológico.
          </p>
          <p className="w-auto text-xl mb-[50px] text-justify max-[1400px]:text-lg max-[900px]:text-base max-[750px]:text-sm">
            Largas esperas para ingresar, proceso tedioso e inseguro para dejar
            entrar a los invitados, poca de comunicación entre el personal de
            seguridad y los propietarios y largos trámites para realizar el pago
            de gastos comunos son algunas de las problemáticas que hemos vivido
            como residentes de comunidades cerradas.
          </p>
          <p className="w-auto text-xl mb-[50px] text-justify max-[1400px]:text-lg max-[900px]:text-base max-[750px]:text-sm">
            Por ellos nos pusimos manos a la obra, vimos una problemática que
            podíamos solucionar y no solo facilitar nuestras vidas, sino la de
            los residentes de muchas comunidades privadas al rededor del mundo.
          </p>
        </main>
        <div className="w-full h-[750px] max-[0px]:hidden">
          <Image
            className="w-full h-full object-cover"
            width={1000}
            height={600}
            src="/icons/loginFamily.png"
            alt="Secure Ingress Home"
          />
        </div>
      </section>
      <Developers />
    </div>
  );
};

export default About;
