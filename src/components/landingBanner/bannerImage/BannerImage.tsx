import Image from "next/image";

const BannerImage: React.FC = (): React.ReactElement => {
  return (
    <Image
      width={1000}
      height={600}
      src="/icons/landingBanner.jpg"
      alt="Secure Ingress Home"
    />
  );
};
export default BannerImage;
