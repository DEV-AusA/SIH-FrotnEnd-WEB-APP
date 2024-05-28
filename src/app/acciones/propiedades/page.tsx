"use client";
import AdminProperties from "@/components/adminProperties/AdminProperties";
import BackLink from "@/components/backButton/BackLink";
import CreateProperty from "@/components/createProperty/CreateProperty";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Properties() {
  const router = useRouter();

  useEffect(() => {
    const isLogged = localStorage.getItem("user");
    if (isLogged) {
      const localUser = JSON.parse(isLogged);
      if (localUser.rol === "admin") {
        return;
      } else {
        router.push("/");
      }
    } else {
      router.push("/ingreso");
    }
  }, [router]);

  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between px-[200px] mt-[20px]">
        <div className=" max-[650px]:hidden">
          <BackLink href="/acciones" />
        </div>
        <div className="flex-1 flex justify-center">
          <h2 className="text-[#384B59] text-4xl font-bold text-center px-8 mt-[20px] mb-[10px] mr-[50px] max-[1330px]:px-0 max-md:text-[20px] max-[500px]:text-base">
            Propiedades
          </h2>
        </div>
      </div>
      <AdminProperties />
      <CreateProperty />
    </div>
  );
}
