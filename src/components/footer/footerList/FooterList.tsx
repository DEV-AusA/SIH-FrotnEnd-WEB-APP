const FooterList: React.FC = (): React.ReactElement => {
  return (
    <ul className="flex items-center justify-center px-16">
      <li className="text-xs text-[#FFBD5C] hover:text-[#ffffff] mx-5">
        Inicio
      </li>
      <span>|</span>
      <li className="text-xs text-[#FFBD5C] hover:text-[#ffffff] mx-5">
        Administrador
      </li>
      <span>|</span>
      <li className="text-xs text-[#FFBD5C] hover:text-[#ffffff] mx-5">
        Propietarios
      </li>
      <span>|</span>
      <li className="text-xs text-[#FFBD5C] hover:text-[#ffffff] mx-5">
        Sobre nosotros
      </li>
      <span>|</span>
      <li className="text-xs text-[#FFBD5C] hover:text-[#ffffff] mx-5">
        Contacto
      </li>
    </ul>
  );
};
export default FooterList;
