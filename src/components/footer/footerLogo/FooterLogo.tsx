import Image from "next/image";

const FooterLogo: React.FC = (): React.ReactElement => {
  return (
    <Image
      width={78}
      height={35}
      src="/icons/orangeLogo.png"
      alt="Secure Ingress Home"
    />
  );
};
export default FooterLogo;
