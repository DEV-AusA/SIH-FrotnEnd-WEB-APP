import BackLink from "@/components/backButton/BackLink";
import OwnerAuthorization from "@/components/ownerAuthorization/OwnerAuthorization";
const Authorizations = () => {
  return (
    <main className="flex flex-col">
      <div className="flex items-center justify-between px-[200px] mt-[20px]">
        <BackLink href="/acciones" />
      </div>
      <OwnerAuthorization />
    </main>
  );
};

export default Authorizations;
