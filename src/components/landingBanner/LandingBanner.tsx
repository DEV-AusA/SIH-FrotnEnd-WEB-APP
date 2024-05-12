import BannerImage from "./bannerImage/BannerImage";
import BannerText from "./bannerText/BannerText";

const LandingBanner: React.FC = (): React.ReactElement => {
  return (
    <main className="flex justify-between px-200 bg-white min-h-[600px]">
      <BannerText />
      <BannerImage />
    </main>
  );
};
export default LandingBanner;
