import PackageAuthorization from "@/components/securityAuthorization/PackageAuthorizations";
import BackLink from "@/components/backButton/BackLink";
const Package = () => {
  return (
    <main className="flex flex-col">
      <div className="flex items-center justify-between px-[200px] mt-[20px]">
        <BackLink href="/acciones" />
      </div>
      <PackageAuthorization />
    </main>
  );
};

export default Package;
