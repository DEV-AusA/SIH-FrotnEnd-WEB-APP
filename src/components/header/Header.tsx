import Logo from "./logo/Logo";
import NavBar from "./navBar/NavBar";
import UserIcon from "./userIcon/UserIcon";

const Header: React.FC = (): React.ReactElement => {
  return (
    <header className=" h-28 px-[200px] bg-[#384B59] flex items-center justify-between">
      <Logo />
      <NavBar />
      <UserIcon />
    </header>
  );
};
export default Header;
