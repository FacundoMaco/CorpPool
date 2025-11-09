"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import { mockDriverHistory } from "@/data/mock";
import RatingStars from "@/components/RatingStars";

export default function ConductorProfilePage() {
  const router = useRouter();
  const [userName, setUserName] = useState("Usuario");
  const [planType, setPlanType] = useState<"premium" | "freemium" | null>(null);
  const averageRating =
    mockDriverHistory.reduce((sum, item) => sum + (item.rating || 0), 0) / mockDriverHistory.length;

  const totalEarned = mockDriverHistory.reduce((sum, item) => sum + item.totalEarned, 0);

  useEffect(() => {
    const name = localStorage.getItem("userName");
    if (name) {
      setUserName(name);
    }
    
    const plan = localStorage.getItem("planType") as "premium" | "freemium" | null;
    setPlanType(plan);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("loggedIn");
    localStorage.removeItem("userName");
    localStorage.removeItem("role");
    localStorage.removeItem("planType");
    router.push("/login");
  };

  const premiumBenefits = [
    "Viajes ilimitados",
    "Prioridad en búsquedas",
    "Soporte prioritario",
    "Estadísticas avanzadas",
    "Sin comisiones",
  ];

  const freemiumBenefits = [
    "3 viajes al mes",
    "Acceso básico a pasajeros",
    "Soporte por email",
  ];

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
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <p className="text-sm text-gray-400 mb-1">Usuario</p>
                <p className="text-lg font-semibold text-white">{userName}</p>
              </div>
              {planType === "premium" && (
                <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                  PREMIUM
                </div>
              )}
            </div>
            
            {planType && (
              <div className="mb-6 pt-4 border-t border-[#2a2a2a]">
                <p className="text-sm text-gray-400 mb-3">Plan actual</p>
                <div className={`rounded-lg p-4 ${planType === "premium" ? "bg-gradient-to-r from-indigo-500/20 to-purple-600/20 border border-indigo-500/30" : "bg-[#121212] border border-[#2a2a2a]"}`}>
                  <div className="flex items-center justify-between mb-3">
                    <p className={`font-bold ${planType === "premium" ? "text-indigo-400" : "text-white"}`}>
                      Plan {planType === "premium" ? "Premium" : "Freemium"}
                    </p>
                    {planType === "premium" && (
                      <span className="text-xs text-indigo-400 font-semibold">S/39.90/mes</span>
                    )}
                  </div>
                  <ul className="space-y-2">
                    {(planType === "premium" ? premiumBenefits : freemiumBenefits).map((benefit, index) => (
                      <li key={index} className="flex items-center gap-2 text-sm text-gray-300">
                        <svg className="w-4 h-4 text-green-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        {benefit}
                      </li>
                    ))}
                  </ul>
                  {planType === "freemium" && (
                    <button
                      onClick={() => router.push("/conductor/plan")}
                      className="w-full mt-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg text-sm transition-all duration-200 active:scale-95"
                    >
                      Actualizar a Premium
                    </button>
                  )}
                </div>
              </div>
            )}

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

