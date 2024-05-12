import Image from "next/image";
import Link from "next/link";

const Logo: React.FC = (): React.ReactElement => {
  return (
    <Link href="/">
      <Image
        className="max-md:w-[121px] max-md:h-[58px]"
        width={146}
        height={70}
        src="/icons/logoWOB.png"
        alt="Secure Ingress Home"
      />
    </Link>
  );
};
export default Logo;
