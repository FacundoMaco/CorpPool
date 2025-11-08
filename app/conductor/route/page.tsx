"use client";

import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import { mockPassengers } from "@/data/mock";

export default function ConductorRoutePage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#121212]">
      <Navbar />
      <main className="px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Ruta completa</h1>
          <p className="text-gray-400 text-base">Gestiona tus pasajeros y paradas</p>
        </div>
        <div className="bg-[#1a1a1a] rounded-2xl border border-[#2a2a2a] p-6 mb-6">
          <div className="mb-6">
            <div className="w-full h-64 bg-[#121212] border-2 border-dashed border-[#2a2a2a] rounded-lg flex items-center justify-center">
              <div className="text-center">
                <svg className="w-16 h-16 text-gray-600 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                </svg>
                <p className="text-gray-500 text-sm font-medium">Mapa en desarrollo</p>
                <p className="text-gray-600 text-xs mt-1">Visualización de ruta próximamente</p>
              </div>
            </div>
          </div>
          <div className="space-y-6">
            <div className="flex items-start gap-3">
              <div className="w-3 h-3 rounded-full bg-green-400 mt-2"></div>
              <div className="flex-1">
                <p className="text-xs text-gray-400 uppercase mb-1">Origen</p>
                <p className="text-white text-sm font-medium">Av. Corrientes 1200, CABA</p>
              </div>
            </div>
            {mockPassengers.map((passenger, index) => (
              <div key={passenger.id} className="flex items-start gap-3 pl-4 border-l-2 border-indigo-500/30">
                <div className="w-3 h-3 rounded-full bg-indigo-400 mt-2"></div>
                <div className="flex-1">
                  <p className="text-xs text-gray-400 uppercase mb-1">Parada {index + 1}</p>
                  <p className="text-white text-sm font-semibold mb-1">{passenger.name}</p>
                  <p className="text-gray-400 text-xs">{passenger.pickupLocation}</p>
                </div>
              </div>
            ))}
            <div className="flex items-start gap-3">
              <div className="w-3 h-3 rounded-full bg-red-400 mt-2"></div>
              <div className="flex-1">
                <p className="text-xs text-gray-400 uppercase mb-1">Destino</p>
                <p className="text-white text-sm font-medium">Torre Corporativa, Zona Norte</p>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-[#1a1a1a] rounded-xl border border-[#2a2a2a] p-4 mb-6">
          <div className="flex justify-between items-center mb-4">
            <p className="text-sm text-gray-400">Total de pasajeros</p>
            <p className="text-lg font-bold text-white">{mockPassengers.length}</p>
          </div>
          <div className="flex justify-between items-center pt-4 border-t border-[#2a2a2a]">
            <p className="text-sm text-gray-400">Ganancia total</p>
            <p className="text-xl font-bold text-indigo-400">S/{mockPassengers.length * 450}</p>
          </div>
        </div>
        <button
          onClick={() => router.push("/conductor/rating")}
          className="w-full px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-full transition-all duration-200 active:scale-95 shadow-lg shadow-indigo-500/20"
        >
          Finalizar viaje y calificar
        </button>
      </main>
    </div>
  );
}

