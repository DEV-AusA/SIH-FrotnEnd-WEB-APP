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
        width={60}
        height={60}
        className="h-[60px] w-[60px]"
      />
    </Link>
  );
};

export default BackLink;
