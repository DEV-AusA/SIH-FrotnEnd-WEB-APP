import GuestAuthorization from "@/components/securityAuthorization/GuestAuthorizations";
import BackLink from "@/components/backButton/BackLink";
const Guests = () => {
  return (
    <main className="flex flex-col">
      <div className="flex items-center justify-between px-[200px] mt-[20px]">
        <BackLink href="/acciones" />
      </div>
      <GuestAuthorization />
    </main>
  );
};

export default Guests;
