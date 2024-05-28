import { Maps } from "@/components/googleMaps/Maps";
import LandingBanner from "@/components/landingBanner";
import ServicesCards from "@/components/services/ServicesCards";

export default function Home() {
  return (
    <main>
      <LandingBanner />
      <ServicesCards />
      <Maps />
    </main>
  );
}
