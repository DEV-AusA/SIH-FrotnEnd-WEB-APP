import Image from "next/image";

const BannerImage: React.FC = (): React.ReactElement => {
  return (
    <div className="w-full h-[500px] max-[419px]:hidden">
      <Image
        className="w-full h-full object-cover"
        width={1000}
        height={600}
        src="/icons/adminBanner.jpg"
        alt="Secure Ingress Home"
      />
    </div>
  );
};
export default BannerImage;
