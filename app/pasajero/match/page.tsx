"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import PaymentOption from "@/components/PaymentOption";
import { mockRoutes, getRouteById, Route } from "@/data/mock";

export default function PasajeroMatchPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selectedRoute, setSelectedRoute] = useState<Route | null>(null);
  const [showPaymentMethods, setShowPaymentMethods] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState<"yape" | "plin" | "tarjeta" | "efectivo" | null>(null);
  
  const routeId = searchParams.get("id");

  useEffect(() => {
    if (routeId) {
      const route = getRouteById(routeId);
      setSelectedRoute(route || mockRoutes[0]);
    } else {
      setSelectedRoute(mockRoutes[0]);
    }
  }, [routeId]);

  const handleJoin = () => {
    setShowPaymentMethods(true);
  };

  const handlePaymentComplete = () => {
    router.push("/pasajero/route");
  };

  if (!selectedRoute) {
    return (
      <div className="min-h-screen bg-[#121212]">
        <Navbar />
        <main className="px-6 py-16 text-center">
          <p className="text-gray-400">Cargando información del viaje...</p>
        </main>
      </div>
    );
  }

  if (showPaymentMethods) {
    return (
      <div className="min-h-screen bg-[#121212] animate-fade-in">
        <Navbar />
        <main className="px-6 py-8">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-white mb-2">Método de pago</h1>
            <p className="text-gray-400 text-sm">Elige cómo deseas pagar tu viaje</p>
          </div>
          <div className="bg-[#1a1a1a] rounded-xl border border-[#2a2a2a] p-4 mb-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-xs text-gray-400 mb-1">Viaje</p>
                <p className="text-sm text-white font-medium">{selectedRoute.origin} → {selectedRoute.destination}</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-400 mb-1">Total</p>
                <p className="text-xl font-bold text-[#3B82F6]">S/{selectedRoute.price}</p>
              </div>
            </div>
          </div>
          <div className="space-y-4 mb-8">
            <PaymentOption
              type="yape"
              selected={selectedPayment === "yape"}
              onSelect={() => setSelectedPayment("yape")}
            />
            <PaymentOption
              type="plin"
              selected={selectedPayment === "plin"}
              onSelect={() => setSelectedPayment("plin")}
            />
            <PaymentOption
              type="tarjeta"
              selected={selectedPayment === "tarjeta"}
              onSelect={() => setSelectedPayment("tarjeta")}
            />
            <PaymentOption
              type="efectivo"
              selected={selectedPayment === "efectivo"}
              onSelect={() => setSelectedPayment("efectivo")}
            />
          </div>
          <button
            onClick={handlePaymentComplete}
            disabled={!selectedPayment}
            className="w-full px-6 py-3 bg-[#3B82F6] hover:bg-[#2563EB] disabled:bg-gray-700 disabled:text-gray-500 disabled:cursor-not-allowed text-white font-semibold rounded-full transition-all duration-200 active:scale-95 shadow-lg shadow-[#3B82F6]/20"
          >
            Confirmar pago
          </button>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#121212] animate-fade-in">
      <Navbar />
      <main className="px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Detalles del viaje</h1>
          <p className="text-gray-400 text-base">Revisa la información antes de unirte</p>
        </div>
        <div className="bg-[#1a1a1a] rounded-2xl border border-[#2a2a2a] p-6 mb-6 animate-scale-in">
          <div className="mb-6">
            <p className="text-xs text-gray-400 mb-1">Conductor</p>
            <p className="text-xl font-bold text-white">{selectedRoute.driverName}</p>
            <div className="flex items-center gap-2 mt-2">
              <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
              <span className="text-sm text-gray-300">4.8</span>
            </div>
          </div>
          <div className="space-y-4 mb-6">
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-green-400 mt-2"></div>
              <div className="flex-1">
                <p className="text-xs text-gray-400 uppercase mb-1">Origen</p>
                <p className="text-white text-sm font-medium">{selectedRoute.origin}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-red-400 mt-2"></div>
              <div className="flex-1">
                <p className="text-xs text-gray-400 uppercase mb-1">Destino</p>
                <p className="text-white text-sm font-medium">{selectedRoute.destination}</p>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 pt-6 border-t border-[#2a2a2a]">
            <div>
              <p className="text-xs text-gray-400 mb-1">Fecha</p>
              <p className="font-semibold text-white text-sm">
                {new Date(selectedRoute.date).toLocaleDateString("es-PE", {
                  weekday: "short",
                  month: "short",
                  day: "numeric",
                })}
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-400 mb-1">Hora</p>
              <p className="font-semibold text-white text-sm">{selectedRoute.departureTime}</p>
            </div>
          </div>
          <div className="bg-[#3B82F6]/10 rounded-lg p-4 border border-[#3B82F6]/20 mt-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-xs text-gray-400">Precio por persona</p>
                <p className="text-xl font-bold text-[#3B82F6]">S/{selectedRoute.price}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => router.back()}
            className="flex-1 px-6 py-3 border-2 border-[#2a2a2a] text-gray-300 font-semibold rounded-full hover:bg-[#2a2a2a] transition-all duration-200 active:scale-95"
          >
            Volver
          </button>
          <button
            onClick={handleJoin}
            className="flex-1 px-6 py-3 bg-[#3B82F6] hover:bg-[#2563EB] text-white font-semibold rounded-full transition-all duration-200 active:scale-95 shadow-lg shadow-[#3B82F6]/20"
          >
            Unirme
          </button>
        </div>
      </main>
    </div>
  );
}

