import Image from "next/image";

const UserIcon: React.FC = (): React.ReactElement => {
  return (
    <Image
      className="max-xl:hidden "
      width={60}
      height={60}
      src="/icons/UserIcon2.png"
      alt="Secure Ingress Home"
    />
  );
};
export default UserIcon;
