"use client";

import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";

export default function RolePage() {
  const router = useRouter();

  const handleRoleSelection = (role: "conductor" | "pasajero") => {
    localStorage.setItem("role", role);
    if (role === "conductor") {
      router.push("/conductor/register");
    } else {
      router.push(`/${role}/dashboard`);
    }
  };

  return (
    <div className="min-h-screen bg-[#121212] animate-fade-in">
      <Navbar />
      <main className="px-6 py-12">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-white mb-3">
            ¿Cómo quieres usar CorpPool?
          </h1>
          <p className="text-gray-400 text-base">
            Elige tu rol para comenzar
          </p>
        </div>
        <div className="space-y-4">
          <button
            onClick={() => handleRoleSelection("conductor")}
            className="w-full bg-[#1a1a1a] border-2 border-[#3B82F6]/30 hover:border-[#3B82F6] rounded-2xl p-6 text-left transition-all duration-200 active:scale-[0.98] animate-scale-in"
          >
            <div className="w-12 h-12 bg-[#3B82F6]/20 rounded-full flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-[#3B82F6]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-white mb-2">Soy Conductor</h2>
            <p className="text-gray-400 text-sm leading-relaxed">
              Publica tu ruta y comparte tu viaje con compañeros. Ahorra en combustible y conoce nuevas personas.
            </p>
          </button>
          <button
            onClick={() => handleRoleSelection("pasajero")}
            className="w-full bg-[#1a1a1a] border-2 border-[#3B82F6]/30 hover:border-[#3B82F6] rounded-2xl p-6 text-left transition-all duration-200 active:scale-[0.98] animate-scale-in"
            style={{ animationDelay: "0.1s" }}
          >
            <div className="w-12 h-12 bg-[#3B82F6]/20 rounded-full flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-[#3B82F6]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-white mb-2">Soy Pasajero</h2>
            <p className="text-gray-400 text-sm leading-relaxed">
              Busca rutas disponibles cerca de ti y únete a viajes compartidos. Viaja cómodo y ahorra dinero.
            </p>
          </button>
        </div>
      </main>
    </div>
  );
}
