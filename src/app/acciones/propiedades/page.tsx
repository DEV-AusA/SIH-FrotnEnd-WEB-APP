"use client";
import AdminProperties from "@/components/adminProperties/AdminProperties";
import { useRouter } from "next/navigation";
export default function Properties() {
  const isLogged = localStorage.getItem("token");
  const router = useRouter();
  if (isLogged) {
    return <AdminProperties />;
  } else {
    router.push("/ingreso");
    return null;
  }
}
