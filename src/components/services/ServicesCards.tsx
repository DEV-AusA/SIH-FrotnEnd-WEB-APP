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

const ServicesCards: React.FC = (): React.ReactElement => {
  return (
    <div className="px-[200px] py-[80px] flex flex-col  items-center justify-center max-[1600px]:px-[100px] max-[1400px]:px-[80px]">
      <h2 className="text-[#384B59] text-4xl font-bold text-center px-[160px]  max-[800px]:text-xl max-[1400px]:px-[60px]">
        Ventajas de usar SIH en tu comunidad
      </h2>
      <div className="flex flex-wrap justify-center mt-[50px] ">
        {cards.map((card) => {
          return (
            <div
              className="flex w-[480px] h-[150px] justify-between items-center my-[20px] mx-[50px] bg-white rounded-[15px] shadow-button max-[800px]:w-[336px] max-[800px]:h-[105px] max-[500px]:h-[120px] max-[500px]:w-[269px] max-[1350px]:mx-[10px]"
              key={card.title}
            >
              <Image
                className="mx-[10px]"
                src={card.image}
                height={80}
                width={100}
                alt={card.alt}
              />
              <p className="text-sih-blue text-2xl pr-[15px] max-[800px]:text-sm">
                {card.text}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default ServicesCards;
