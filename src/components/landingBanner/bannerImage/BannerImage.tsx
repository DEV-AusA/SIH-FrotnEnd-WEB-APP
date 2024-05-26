import Image from "next/image";

const BannerImage: React.FC = (): React.ReactElement => {
  return (
    <div className="w-full h-[600px] max-[420px]:hidden">
      <Image
        className="w-full h-full object-cover"
        width={1000}
        height={600}
        src="/icons/landingBanner.jpg"
        alt="Secure Ingress Home"
      />
    </div>
  );
};
export default BannerImage;
