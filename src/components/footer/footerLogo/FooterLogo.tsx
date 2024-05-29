import Image from "next/image";

const FooterLogo: React.FC = (): React.ReactElement => {
  return (
    <div className="flex items-center">
      <Image
        width={80}
        height={30}
        src="/icons/orangeLogo.png"
        alt="Secure Ingress Home"
        className="h-2/3 w-auto"
      />
    </div>
  );
};
export default FooterLogo;
