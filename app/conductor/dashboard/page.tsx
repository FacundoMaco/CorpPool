"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { mockDriverHistory } from "@/data/mock";

export default function ConductorDashboard() {
  const router = useRouter();
  const [userName, setUserName] = useState("Conductor");

  useEffect(() => {
    const name = localStorage.getItem("userName");
    if (name) {
      const firstName = name.split(" ")[0];
      setUserName(firstName);
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#121212] animate-fade-in">
      <header className="bg-[#1a1a1a] border-b border-[#2a2a2a] px-6 py-6">
        <h1 className="text-2xl font-bold text-white mb-1">Hola, {userName}</h1>
        <p className="text-gray-400 text-sm">Gestiona tus viajes compartidos</p>
      </header>
      
      <main className="px-6 py-8">
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="bg-[#1a1a1a] rounded-xl border border-[#2a2a2a] p-4 animate-scale-in">
            <div className="text-center">
              <p className="text-xs text-gray-400 mb-1">Viajes totales</p>
              <p className="text-2xl font-bold text-white">{mockDriverHistory.length}</p>
            </div>
          </div>
          <div className="bg-[#1a1a1a] rounded-xl border border-[#2a2a2a] p-4 animate-scale-in" style={{ animationDelay: "0.1s" }}>
            <div className="text-center">
              <p className="text-xs text-gray-400 mb-1">Ganancia total</p>
              <p className="text-2xl font-bold text-[#3B82F6]">S/{mockDriverHistory.reduce((acc, h) => acc + h.totalEarned, 0)}</p>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <button
            onClick={() => router.push("/conductor/publish")}
            className="w-full bg-[#3B82F6] hover:bg-[#2563EB] text-white font-semibold px-6 py-4 rounded-full transition-all duration-200 active:scale-95 shadow-lg shadow-[#3B82F6]/20 animate-scale-in"
            style={{ animationDelay: "0.2s" }}
          >
            Publicar nueva ruta
          </button>
        </div>

        <div>
          <h2 className="text-lg font-bold text-white mb-4">Historial reciente</h2>
          <div className="space-y-3">
            {mockDriverHistory.map((history, index) => (
              <div
                key={history.id}
                className="bg-[#1a1a1a] rounded-xl border border-[#2a2a2a] p-4 animate-fade-in"
                style={{ animationDelay: `${0.3 + index * 0.1}s` }}
              >
                <div className="flex justify-between items-start mb-2">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-white">{history.origin} → {history.destination}</p>
                    <p className="text-xs text-gray-400 mt-1">
                      {new Date(history.date).toLocaleDateString("es-PE")} • {history.passengers.length} pasajeros
                    </p>
                  </div>
                  <p className="text-lg font-bold text-[#3B82F6]">S/{history.totalEarned}</p>
                </div>
                {history.rating && (
                  <div className="flex items-center gap-1">
                    <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                    <span className="text-sm text-gray-300">{history.rating}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
