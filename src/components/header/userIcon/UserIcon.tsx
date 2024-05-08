import Image from "next/image";

const UserIcon: React.FC = (): React.ReactElement => {
  return (
    <Image
      width={50}
      height={50}
      src="/icons/UserIcon.png"
      alt="Secure Ingress Home"
    />
  );
};
export default UserIcon;
