"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import PaymentOption from "@/components/PaymentOption";
import { getRouteById } from "@/data/mock";

export default function PaymentPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const routeId = searchParams.get("routeId");
  const [selectedPayment, setSelectedPayment] = useState<"yape" | "plin" | "tarjeta" | "efectivo" | null>(null);

  const route = routeId ? getRouteById(routeId) : null;
  const price = route?.price || 8;

  const handleContinue = () => {
    if (selectedPayment) {
      router.push(`/success?amount=${price}&method=${selectedPayment}`);
    }
  };

  return (
    <div className="min-h-screen bg-[#121212]">
      <Navbar />
      <main className="px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Método de pago</h1>
          <p className="text-gray-400 text-base">Elige cómo deseas pagar tu viaje</p>
        </div>
        {route && (
          <div className="bg-[#1a1a1a] rounded-xl border border-[#2a2a2a] p-4 mb-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-xs text-gray-400 mb-1">Viaje</p>
                <p className="text-sm text-white font-medium">{route.origin} → {route.destination}</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-400 mb-1">Total</p>
                <p className="text-xl font-bold text-[#3B82F6]">S/{price}</p>
              </div>
            </div>
          </div>
        )}
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
        <div className="flex gap-3">
          <button
            onClick={() => router.back()}
            className="flex-1 px-6 py-3 border-2 border-[#2a2a2a] text-gray-300 font-semibold rounded-full hover:bg-[#2a2a2a] transition-all duration-200 active:scale-95"
          >
            Volver
          </button>
          <button
            onClick={handleContinue}
            disabled={!selectedPayment}
            className="flex-1 px-6 py-3 bg-[#3B82F6] hover:bg-[#2563EB] disabled:bg-gray-700 disabled:text-gray-500 disabled:cursor-not-allowed text-white font-semibold rounded-full transition-all duration-200 active:scale-95 shadow-lg shadow-[#3B82F6]/20"
          >
            Continuar
          </button>
        </div>
      </main>
    </div>
  );
}

