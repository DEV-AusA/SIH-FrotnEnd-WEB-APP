import Image from "next/image";

const Logo: React.FC = (): React.ReactElement => {
  return (
    <Image
      width={146}
      height={70}
      src="/icons/logoWOB.png"
      alt="Secure Ingress Home"
    />
  );
};
export default Logo;
