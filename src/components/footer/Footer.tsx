import FooterList from "./footerList/FooterList";
import FooterLogo from "./footerLogo/FooterLogo";
import FooterName from "./footerName/FooterName";

const Footer: React.FC = (): React.ReactElement => {
  return (
    <footer className=" px-[200px] bg-[#384B59] flex flex-col items-center justify-between max-2xl:px-[50px]">
      <div className=" w-full bg-[#384B59] flex justify-between my-[30px]">
        <FooterName />
        <FooterList />
        <FooterLogo />
      </div>
      <div className="h-14 w-full bg-[#384B59] flex items-center justify-center mt-[10px] text-xs text-[#FFBD5C] border-t border-white">
        <span>Copyright 2024 &#169; Todos los derechos reservados</span>
      </div>
    </footer>
  );
};
export default Footer;
