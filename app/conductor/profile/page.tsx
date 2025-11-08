"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import { mockDriverHistory } from "@/data/mock";
import RatingStars from "@/components/RatingStars";

export default function ConductorProfilePage() {
  const router = useRouter();
  const [userName, setUserName] = useState("Usuario");
  const averageRating =
    mockDriverHistory.reduce((sum, item) => sum + (item.rating || 0), 0) / mockDriverHistory.length;

  const totalEarned = mockDriverHistory.reduce((sum, item) => sum + item.totalEarned, 0);

  useEffect(() => {
    const name = localStorage.getItem("userName");
    if (name) {
      setUserName(name);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("loggedIn");
    localStorage.removeItem("userName");
    localStorage.removeItem("role");
    router.push("/login");
  };

  return (
    <div className="min-h-screen bg-[#121212] animate-fade-in">
      <Navbar />
      <main className="px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Mi perfil</h1>
          <p className="text-gray-400 text-base">Gestiona tu cuenta y revisa tu actividad</p>
        </div>
        <div className="space-y-6">
          <div className="bg-[#1a1a1a] rounded-2xl border border-[#2a2a2a] p-6">
            <div className="mb-4">
              <p className="text-sm text-gray-400 mb-1">Usuario</p>
              <p className="text-lg font-semibold text-white">{userName}</p>
            </div>
            <div className="flex items-center justify-between mb-6 pt-4 border-t border-[#2a2a2a]">
              <div>
                <p className="text-sm text-gray-400 mb-1">Saldo disponible</p>
                <p className="text-3xl font-bold text-white">S/{totalEarned}</p>
              </div>
              <button className="px-4 py-2 bg-[#3B82F6] hover:bg-[#2563EB] text-white text-sm font-semibold rounded-full transition-all duration-200 active:scale-95">
                Retirar
              </button>
            </div>
            <div className="pt-6 border-t border-[#2a2a2a]">
              <p className="text-sm text-gray-400 mb-3">Valoración promedio</p>
              <div className="flex items-center gap-3">
                <RatingStars initialRating={Math.round(averageRating)} readonly={true} />
                <span className="text-lg font-semibold text-white">{averageRating.toFixed(1)}</span>
              </div>
            </div>
          </div>
          <div className="bg-[#1a1a1a] rounded-2xl border border-[#2a2a2a] p-6">
            <h2 className="text-xl font-bold text-white mb-4">Historial de viajes</h2>
            <div className="space-y-4">
              {mockDriverHistory.map((item) => (
                <div key={item.id} className="border-t border-[#2a2a2a] pt-4 first:border-t-0 first:pt-0">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <p className="text-sm text-gray-400 mb-1">
                        {new Date(item.date).toLocaleDateString("es-PE", {
                          weekday: "short",
                          month: "short",
                          day: "numeric",
                        })}
                      </p>
                      <p className="text-white font-semibold text-sm">{item.origin}</p>
                      <p className="text-gray-400 text-xs">{item.destination}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[#3B82F6] font-bold">S/{item.totalEarned}</p>
                      {item.rating && (
                        <div className="mt-1">
                          <RatingStars initialRating={item.rating} readonly={true} />
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="mt-2">
                    <p className="text-xs text-gray-400">
                      Pasajeros: {item.passengers.join(", ")}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full px-6 py-3 bg-red-600/20 hover:bg-red-600/30 border-2 border-red-600/50 text-red-400 font-semibold rounded-full transition-all duration-200 active:scale-95"
          >
            Cerrar sesión
          </button>
        </div>
      </main>
    </div>
  );
}

