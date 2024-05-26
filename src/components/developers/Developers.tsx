import Image from "next/image";

interface Developer {
  profilePic: string;
  name: string;
  stack: string;
  linkedln: string;
  github: string;
}

const developers = [
  {
    profilePic: "/abalos.png",
    name: "Alejandro Abalos",
    stack: "Desarrollador Back-end",
    linkedln: "https://www.linkedin.com/in/alejandro-abalos-5bb905115/",
    github: "https://github.com/AlejandroExeAbalosF",
  },
  {
    profilePic: "/alzate.png",
    name: "Alejandro Alzate",
    stack: "Desarrollador Front-end",
    linkedln: "https://www.linkedin.com/in/alejandro-alzate-morales-91b3b127b/",
    github: "https://github.com/AlejandroA03",
  },
  {
    profilePic: "/ausa.png",
    name: "Cesar Ausa",
    stack: "Desarrollador Back-end",
    linkedln: "https://www.linkedin.com/in/dev-ausa/",
    github: "https://github.com/DEV-AusA",
  },
  {
    profilePic: "/jpr.png",
    name: "Juan Rueda",
    stack: "Desarrollador Back-end",
    linkedln: "https://www.linkedin.com/in/juan-pablo-rueda-zuluaga-40b34b217/",
    github: "https://github.com/JPRuedaZ",
  },
  {
    profilePic: "/mg.png",
    name: "Manuel Guaicara",
    stack: "Desarrollador Front-end",
    linkedln:
      "https://www.linkedin.com/in/manuel-alejandro-guaicara-dagger-784a06194/",
    github: "https://github.com/ManuelGuaicaraDagger",
  },
];

const DeveloperCard: React.FC<Developer> = ({
  profilePic,
  name,
  stack,
  linkedln,
  github,
}) => {
  return (
    <div className="flex flex-col flex-wrap items-center border border-white p-[20px] mx-[10px] rounded-[10px] bg-white">
      <Image
        src={profilePic}
        alt={name}
        width={200}
        height={200}
        className="rounded-full  max-[700px]:w-[100px] max-[700px]:h-[100px]"
      />
      <h3 className="text-sih-blue text-bold text-2xl my-[5px]  max-[700px]:text-lg">
        {name}
      </h3>
      <h4 className="text-sih-blue mb-[10px]  max-[700px]:text-sm">{stack}</h4>
      <div className="flex">
        <a href={linkedln} target="_blank" rel="noopener noreferrer">
          <Image
            src="/icons/linkedin.png"
            alt="linkedin"
            height={30}
            width={30}
            className="mx-[5px]"
          />
        </a>
        <a href={github} target="_blank" rel="noopener noreferrer">
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
};

const Developers: React.FC = (): React.ReactElement => {
  return (
    <section className="flex flex-col items-center justify-center px-[200px] text-sih-blue text-center max-[1700px]:px-[100px] max-[1050px]:px-[50px]">
      <h2 className="text-4xl font-bold text-sih-blue mt-[50px] mb-[80px] max-[1330px]:px-0 max-md:text-2xl max-[635px]:text-xl max-[600px]:text-lg">
        Nuestro equipo de desarrolladores
      </h2>
      <div className="flex flex-wrap justify-center gap-[20px] mb-[100px]">
        {developers.map((dev) => (
          <DeveloperCard key={dev.name} {...dev} />
        ))}
      </div>
    </section>
  );
};

export default Developers;
