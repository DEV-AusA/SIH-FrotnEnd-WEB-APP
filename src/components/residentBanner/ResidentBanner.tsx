import BannerImage from "./bannerImage/BannerImage";
import BannerText from "./bannerText/BannerText";

const OwnerBanner: React.FC = (): React.ReactElement => {
  return (
    <main className="flex justify-between px-200 bg-white min-h-[500px]">
      <BannerText />
      <BannerImage />
    </main>
  );
};
export default OwnerBanner;
