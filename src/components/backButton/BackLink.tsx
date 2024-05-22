import Link from "next/link";
import Image from "next/image";

interface BackLinkProps {
  href: string;
}

const BackLink: React.FC<BackLinkProps> = ({ href }) => {
  return (
    <Link href={href}>
      <Image
        src="/icons/back.png"
        alt="Volver"
        width={50}
        height={50}
        className="h-[50px] w-[50px]"
      />
    </Link>
  );
};

export default BackLink;
