"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import PaymentOption from "@/components/PaymentOption";
import { mockPassengers } from "@/data/mock";

export default function ConductorMatchPage() {
  const router = useRouter();
  const [showPaymentMethods, setShowPaymentMethods] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState<"yape" | "plin" | "tarjeta" | "efectivo" | null>(null);

  const handleConfirmMatch = () => {
    setShowPaymentMethods(true);
  };

  const handlePaymentComplete = () => {
    router.push("/conductor/route");
  };

  if (showPaymentMethods) {
    return (
      <div className="min-h-screen bg-[#121212] animate-fade-in">
        <Navbar />
        <main className="px-6 py-8">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-white mb-2">Método de pago del pasajero</h1>
            <p className="text-gray-400 text-sm">El pasajero pagará con:</p>
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
            Confirmar y continuar
          </button>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#121212] animate-fade-in">
      <Navbar />
      <main className="px-6 py-8">
        <div className="mb-8 text-center animate-scale-in">
          <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-10 h-10 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">¡Match confirmado!</h1>
          <p className="text-gray-400 text-base">Un pasajero se ha unido a tu ruta</p>
        </div>
        <div className="bg-[#1a1a1a] rounded-2xl border border-[#2a2a2a] p-6 mb-6 animate-fade-in" style={{ animationDelay: "0.2s" }}>
          <div className="space-y-5">
            <div>
              <p className="text-xs text-gray-400 mb-1">Pasajero</p>
              <p className="text-xl font-bold text-white">{mockPassengers[0].name}</p>
            </div>
            <div className="border-t border-[#2a2a2a] pt-5">
              <p className="text-xs text-gray-400 mb-2">Punto de recogida</p>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-[#3B82F6] mt-2"></div>
                <p className="text-white text-sm font-medium">{mockPassengers[0].pickupLocation}</p>
              </div>
            </div>
            <div className="bg-[#3B82F6]/10 rounded-lg p-4 border border-[#3B82F6]/20">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-xs text-gray-400">Ganancia estimada</p>
                  <p className="text-xl font-bold text-[#3B82F6]">S/8</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => router.push("/conductor/publish")}
            className="flex-1 px-6 py-3 border-2 border-[#2a2a2a] text-gray-300 font-semibold rounded-full hover:bg-[#2a2a2a] transition-all duration-200 active:scale-95"
          >
            Publicar otra
          </button>
          <button
            onClick={handleConfirmMatch}
            className="flex-1 px-6 py-3 bg-[#3B82F6] hover:bg-[#2563EB] text-white font-semibold rounded-full transition-all duration-200 active:scale-95 shadow-lg shadow-[#3B82F6]/20"
          >
            Confirmar match
          </button>
        </div>
      </main>
    </div>
  );
}

