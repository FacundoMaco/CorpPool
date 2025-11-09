"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { mockDriverHistory } from "@/data/mock";

export default function ConductorDashboard() {
  const router = useRouter();
  const [userName, setUserName] = useState("Conductor");

  useEffect(() => {
    const driverData = localStorage.getItem("driverData");
    if (!driverData) {
      router.push("/conductor/register");
      return;
    }
    const name = localStorage.getItem("userName");
    if (name) {
      const firstName = name.split(" ")[0];
      setUserName(firstName);
    } else {
      try {
        const data = JSON.parse(driverData);
        if (data.name) {
          const firstName = data.name.split(" ")[0];
          setUserName(firstName);
        }
      } catch (e) {
        console.error("Error parsing driverData", e);
      }
    }
  }, [router]);

  return (
    <div className="min-h-screen bg-[#121212] animate-fade-in">
      <header className="bg-[#1a1a1a] border-b border-[#2a2a2a] px-6 py-6">
        <h1 className="text-2xl font-bold text-white mb-1">Hola, {userName}</h1>
        <p className="text-gray-400 text-sm">Gestiona tus viajes compartidos</p>
      </header>
      
      <main className="px-6 py-8">
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="bg-gradient-to-br from-[#181818] to-[#121212] rounded-2xl border border-[#2a2a2a] p-5 shadow-lg animate-scale-in">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center">
                <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <p className="text-xs text-gray-400 mb-1 font-medium">Viajes totales</p>
            <p className="text-2xl font-bold text-white">{mockDriverHistory.length}</p>
          </div>
          <div className="bg-gradient-to-br from-[#181818] to-[#121212] rounded-2xl border border-[#2a2a2a] p-5 shadow-lg animate-scale-in" style={{ animationDelay: "0.1s" }}>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center">
                <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <p className="text-xs text-gray-400 mb-1 font-medium">Ganancia total</p>
            <p className="text-2xl font-bold text-[#3B82F6]">S/{mockDriverHistory.reduce((acc, h) => acc + h.totalEarned, 0)}</p>
          </div>
        </div>

        <div className="mb-8">
          <button
            onClick={() => router.push("/conductor/publish")}
            className="w-full bg-gradient-to-r from-blue-500 to-violet-600 hover:from-blue-400 hover:to-violet-500 text-white font-semibold px-6 py-4 rounded-full transition-all duration-200 active:scale-95 shadow-2xl shadow-blue-500/30 hover:shadow-blue-500/50 animate-scale-in"
            style={{ animationDelay: "0.2s" }}
          >
            Publicar nueva ruta
          </button>
        </div>

        <div>
          <h2 className="text-xl font-bold text-white mb-4">Historial reciente</h2>
          <div className="space-y-3">
            {mockDriverHistory.map((history, index) => (
              <div
                key={history.id}
                className="bg-gradient-to-br from-[#181818] to-[#121212] rounded-2xl border border-[#2a2a2a] p-5 shadow-lg animate-fade-in hover:scale-[1.02] transition-transform duration-200"
                style={{ animationDelay: `${0.3 + index * 0.1}s` }}
              >
                <div className="flex justify-between items-start mb-2">
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-white mb-1">{history.origin} → {history.destination}</p>
                    <p className="text-xs text-gray-400">
                      {new Date(history.date).toLocaleDateString("es-PE")} • {history.passengers.length} pasajeros
                    </p>
                  </div>
                  <p className="text-xl font-bold text-[#3B82F6]">S/{history.totalEarned}</p>
                </div>
                {history.rating && (
                  <div className="flex items-center gap-1 mt-2">
                    <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                    <span className="text-sm text-gray-300 font-medium">{history.rating}</span>
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
