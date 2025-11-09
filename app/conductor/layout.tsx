"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import BottomNav from "@/components/BottomNav";

export default function ConductorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  useEffect(() => {
    const role = localStorage.getItem("role");
    if (!role) {
      router.push("/role");
    } else if (role !== "conductor") {
      router.push("/pasajero/dashboard");
    }
  }, [router]);

  return (
    <div className="min-h-screen bg-[#121212] pb-20 safe-area-bottom">
      {children}
      <BottomNav />
    </div>
  );
}
