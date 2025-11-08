"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import { getRouteById, Route } from "@/data/mock";

export default function ConfirmationPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [route, setRoute] = useState<Route | null>(null);
  const routeId = searchParams.get("id");

  useEffect(() => {
    if (routeId) {
      const foundRoute = getRouteById(routeId);
      setRoute(foundRoute || null);
    }
  }, [routeId]);

  if (!route) {
    return (
      <div className="min-h-screen bg-[#121212]">
        <Navbar />
        <main className="px-6 py-16 text-center">
          <p className="text-gray-400">Cargando información del viaje...</p>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#121212]">
      <Navbar />
      <main className="px-6 py-12">
        <div className="bg-[#1a1a1a] rounded-2xl border border-[#2a2a2a] p-6">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-10 h-10 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-white mb-2">
              ¡Viaje confirmado!
            </h1>
            <p className="text-gray-400 text-sm">
              Tu reserva ha sido exitosa
            </p>
          </div>
          <div className="border-t border-[#2a2a2a] pt-6 space-y-5">
            <div>
              <p className="text-xs text-gray-400 mb-1">Conductor</p>
              <p className="text-lg font-semibold text-white">{route.driverName}</p>
            </div>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-green-400 mt-2"></div>
                <div className="flex-1">
                  <p className="text-xs text-gray-400 uppercase mb-1">Origen</p>
                  <p className="text-white text-sm font-medium">{route.origin}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-red-400 mt-2"></div>
                <div className="flex-1">
                  <p className="text-xs text-gray-400 uppercase mb-1">Destino</p>
                  <p className="text-white text-sm font-medium">{route.destination}</p>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-[#2a2a2a]">
              <div>
                <p className="text-xs text-gray-400 mb-1">Fecha</p>
                <p className="font-semibold text-white text-sm">
                  {new Date(route.date).toLocaleDateString("es-AR", {
                    weekday: "short",
                    month: "short",
                    day: "numeric",
                  })}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-400 mb-1">Hora</p>
                <p className="font-semibold text-white text-sm">{route.departureTime}</p>
              </div>
            </div>
            <div className="bg-indigo-500/10 rounded-lg p-4 border border-indigo-500/20">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-xs text-gray-400">Total a pagar</p>
                  <p className="text-xl font-bold text-indigo-400">${route.price}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-6 border-t border-[#2a2a2a]">
            <p className="text-xs text-gray-400 mb-6 text-center">
              Recibirás un recordatorio antes del viaje. El conductor se pondrá en contacto contigo.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => router.push("/pasajero/search")}
                className="flex-1 px-6 py-3 border-2 border-[#2a2a2a] text-gray-300 font-semibold rounded-full hover:bg-[#2a2a2a] transition-all duration-200 active:scale-95"
              >
                Buscar más
              </button>
              <button
                onClick={() => router.push("/")}
                className="flex-1 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-full transition-all duration-200 active:scale-95 shadow-lg shadow-indigo-500/20"
              >
                Inicio
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
