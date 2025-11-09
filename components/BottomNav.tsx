"use client";

import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function BottomNav() {
  const router = useRouter();
  const pathname = usePathname();
  const [role, setRole] = useState<"conductor" | "pasajero" | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedRole = localStorage.getItem("role") as "conductor" | "pasajero" | null;
    setRole(savedRole);
  }, []);

  if (!mounted || !role) return null;

  const conductorItems = [
    {
      label: "Offers",
      icon: (
        <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      path: "/conductor/offers",
    },
    {
      label: "Inicio",
      icon: (
        <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      ),
      path: "/conductor/dashboard",
    },
    {
      label: "Perfil",
      icon: (
        <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      ),
      path: "/conductor/profile",
    },
  ];

  const pasajeroItems = [
    {
      label: "Buscar",
      icon: (
        <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      ),
      path: "/pasajero/search",
    },
    {
      label: "Inicio",
      icon: (
        <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      ),
      path: "/pasajero/dashboard",
    },
    {
      label: "Perfil",
      icon: (
        <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      ),
      path: "/pasajero/profile",
    },
  ];

  const items = role === "conductor" ? conductorItems : pasajeroItems;

  return (
    <nav className="fixed bottom-0 w-full max-w-[420px] bg-[#1a1a1a]/80 backdrop-blur-xl border-t border-[#2a2a2a] safe-area-bottom">
      <div className="flex justify-around items-center h-16 pb-safe">
        {items.map((item) => {
          const isActive = pathname === item.path || pathname.startsWith(item.path);
          return (
            <button
              key={item.path}
              onClick={() => router.push(item.path)}
              className={`flex flex-col items-center justify-center flex-1 h-full gap-1 transition-all duration-200 hover:scale-105 active:scale-95 ${
                isActive
                  ? "text-[#3B82F6]"
                  : "text-[#6b7280] hover:text-gray-400"
              }`}
            >
              <div className={`${isActive ? "w-6 h-6" : "w-5 h-5"} transition-all duration-200`}>
                {item.icon}
              </div>
              <span className="text-xs font-medium tracking-tight">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
