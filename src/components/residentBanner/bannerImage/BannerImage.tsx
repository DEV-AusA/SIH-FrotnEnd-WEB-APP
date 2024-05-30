import Image from "next/image";

const BannerImage: React.FC = (): React.ReactElement => {
  return (
    <div className="w-full h-[700px] max-[800px]:hidden">
      <Image
        className="w-full h-full object-cover"
        width={1000}
        height={600}
        src="/icons/ownerBanner.jpg"
        alt="Secure Ingress Home"
      />
    </div>
  );
};
export default BannerImage;
