"use client";

import { useRouter, useSearchParams } from "next/navigation";
import Navbar from "@/components/Navbar";

export default function SuccessPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const amount = searchParams.get("amount") || "8";
  const method = searchParams.get("method") || "efectivo";

  const methodNames: Record<string, string> = {
    yape: "Yape",
    plin: "Plin",
    tarjeta: "Tarjeta",
    efectivo: "Efectivo",
  };

  return (
    <div className="min-h-screen bg-[#121212]">
      <Navbar />
      <main className="px-6 py-8">
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
          <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mb-6 animate-scale-in">
            <svg className="w-12 h-12 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-white mb-3 text-center">Viaje confirmado con éxito</h1>
          <p className="text-gray-400 text-base text-center mb-8">
            Gracias por usar CorpPool
          </p>
          <div className="bg-[#1a1a1a] rounded-xl border border-[#2a2a2a] p-6 w-full max-w-sm mb-8">
            <div className="text-center">
              <p className="text-xs text-gray-400 mb-2">Monto pagado</p>
              <p className="text-3xl font-bold text-[#3B82F6] mb-4">S/{amount}</p>
              <div className="pt-4 border-t border-[#2a2a2a]">
                <p className="text-xs text-gray-400 mb-1">Método de pago</p>
                <p className="text-sm text-white font-semibold">{methodNames[method] || method}</p>
              </div>
            </div>
          </div>
          <button
            onClick={() => router.push("/")}
            className="w-full max-w-sm px-6 py-3 bg-[#3B82F6] hover:bg-[#2563EB] text-white font-semibold rounded-full transition-all duration-200 active:scale-95 shadow-lg shadow-[#3B82F6]/20"
          >
            Volver al inicio
          </button>
        </div>
      </main>
    </div>
  );
}

