import OwnerBills from "@/components/ownerBills/OwnerBills";
import BackLink from "@/components/backButton/BackLink";
const Bills = () => {
  return (
    <main className="flex flex-col">
      <div className="flex items-center justify-between px-[200px] mt-[20px]">
        <BackLink href="/acciones" />
      </div>
      <OwnerBills />
    </main>
  );
};

export default Bills;
