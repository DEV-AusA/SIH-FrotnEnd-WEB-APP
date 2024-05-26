import Image from "next/image";

const developers = [
  {
    profilePic: "/icons/abalos.jpeg",
    name: "Alejandro Abalos",
    stack: "Desarrollador Back-end",
    linkedln: "https://www.linkedin.com/in/alejandro-abalos-5bb905115/",
    github: "https://github.com/AlejandroExeAbalosF",
  },
  {
    profilePic: "/icons/alzate.jpeg",
    name: "Alejandro Alzate",
    stack: "Desarrollador Front-end",
    linkedln: "https://www.linkedin.com/in/alejandro-alzate-morales-91b3b127b/",
    github: "https://github.com/AlejandroA03",
  },
  {
    profilePic: "/icons/Ausa.jpeg",
    name: "Cesar Ausa",
    stack: "Desarrollador Back-end",
    linkedln: "https://www.linkedin.com/in/dev-ausa/",
    github: "https://github.com/DEV-AusA",
  },
  {
    profilePic: "/icons/rueda.jpg",
    name: "Juan Rueda",
    stack: "Desarrollador Back-end",
    linkedln: "https://www.linkedin.com/in/juan-pablo-rueda-zuluaga-40b34b217/",
    github: "https://github.com/JPRuedaZ",
  },
  {
    profilePic: "/icons/guaicara.png",
    name: "Manuel Guaicara",
    stack: "Desarrollador Front-end",
    linkedln:
      "https://www.linkedin.com/in/manuel-alejandro-guaicara-dagger-784a06194/",
    github: "https://github.com/ManuelGuaicaraDagger",
  },
];

const Developers: React.FC = (): React.ReactElement => {
  return (
    <section className="flex flex-col items-center justify-center px-[200px] text-sih-blue text-justify">
      <h2 className="text-4xl font-bold text-sih-blue mt-[50px] mb-[80px]">
        Nuestro equipo de desarrolladores
      </h2>
      <div className="flex mb-[100px]">
        {developers.map((devs) => {
          return (
            <div
              key={devs.name}
              className="flex flex-col flex-wrap  items-center border border-white p-[20px] mx-[10px] rounded-[10px] bg-white"
            >
              <Image
                src={devs.profilePic}
                alt={devs.name}
                width={200}
                height={200}
                className="rounded-full"
              />
              <h3 className="text-sih-blue text-bold text-2xl my-[5px]">
                {devs.name}
              </h3>
              <h4 className="text-sih-blue mb-[10px]">{devs.stack}</h4>
              <div className="flex">
                <a href="">
                  <Image
                    src="/icons/linkedin.png"
                    alt="linkedin"
                    height={30}
                    width={30}
                    className="mx-[5px]"
                  />
                </a>
                <a href="">
                  <Image
                    src="/icons/github.png"
                    alt="github"
                    width={30}
                    height={30}
                    className="mx-[5px]"
                  />
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Developers;
