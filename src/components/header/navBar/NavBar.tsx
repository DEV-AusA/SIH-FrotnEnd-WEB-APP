const NavBar: React.FC = (): React.ReactElement => {
  return (
    <ul className="w-full flex items-center justify-between px-16">
      <li className="text-xl hover:text-[#FFBD5C]">Inicio</li>
      <li className="text-xl hover:text-[#FFBD5C]">Administrador</li>
      <li className="text-xl hover:text-[#FFBD5C]">Propietarios</li>
      <li className="text-xl hover:text-[#FFBD5C]">Sobre nosotros</li>
      <li className="text-xl hover:text-[#FFBD5C]">Contacto</li>
    </ul>
  );
};
export default NavBar;
