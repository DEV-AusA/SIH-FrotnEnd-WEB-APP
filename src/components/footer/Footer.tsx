import FooterList from "./footerList/FooterList";
import FooterLogo from "./footerLogo/FooterLogo";
import FooterName from "./footerName/FooterName";

const Footer: React.FC = (): React.ReactElement => {
  return (
    <footer className=" h-14 px-[200px] bg-[#384B59] flex items-center justify-between ">
      <FooterName />
      <FooterList />
      <FooterLogo />
    </footer>
  );
};
export default Footer;
