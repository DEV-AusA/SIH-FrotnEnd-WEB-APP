import Image from "next/image";

const cards = [
  {
    image: "/icons/pay.png",
    title: "Realizar pago",
    alt: "Pagar expensas",
    text: "Podrás realizar todos los pagos administrativos en un solo lugar",
  },
  {
    image: "/icons/check.png",
    title: "Autorizaciones",
    alt: "Autorizar ingreso a barrio privado",
    text: "Autoriza el ingreso de tus invitados o servicios de paqueterías con un solo click",
  },
  {
    image: "/icons/bill.png",
    title: "Mis facturas",
    alt: "Registro de mis facturas",
    text: "Con nuestra base de datos tendrás fácil y rápido acceso a tus fácturas pagadas",
  },
  {
    image: "/icons/chat.png",
    title: "Chat",
    alt: "Chat con personal de seguridad",
    text: "Si lo necesitas, comunícate rápidamente con el personal de seguridad las 24hrs",
  },
];

const ResidentServices: React.FC = (): React.ReactElement => {
  return (
    <div className="px-[200px] py-[80px] flex flex-col  items-center justify-center">
      <h2 className="text-[#384B59] text-4xl font-bold text-center px-[160px]">
        ¿Qué puedo hacer como residente en SIH?
      </h2>
      <div className="flex flex-wrap justify-center mt-[50px] ">
        {cards.map((card) => {
          return (
            <div
              className="flex w-[480px] h-[150px] justify-between items-center my-[20px] mx-[50px] bg-white rounded-[15px] shadow-button"
              key={card.title}
            >
              <Image src={card.image} height={100} width={120} alt={card.alt} />
              <p className="text-sih-blue text-2xl pr-[15px]">{card.text}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default ResidentServices;
