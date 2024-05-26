import Image from "next/image";

const LoginImage: React.FC = (): React.ReactElement => {
  return (
    <div className="w-full h-[600] max-[880px]:hidden">
      <Image
        className="w-full h-full object-cover"
        width={1000}
        height={600}
        src="/icons/loginFamily.png"
        alt="Secure Ingress Home"
      />
    </div>
  );
};
export default LoginImage;
