"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { mockPassengerHistory } from "@/data/mock";
import MapView from "@/components/MapView";

export default function PasajeroDashboard() {
  const router = useRouter();
  const [userName, setUserName] = useState("Pasajero");
  const [pickupLocation, setPickupLocation] = useState("Surco, Lima");
  const [destination, setDestination] = useState("");
  const [showDestinationInput, setShowDestinationInput] = useState(false);

  useEffect(() => {
    const name = localStorage.getItem("userName");
    if (name) {
      const firstName = name.split(" ")[0];
      setUserName(firstName);
    }
  }, []);

  const handleSearch = () => {
    if (!destination.trim()) {
      setShowDestinationInput(true);
      return;
    }
    
    localStorage.setItem("passengerPickup", pickupLocation);
    localStorage.setItem("passengerDestination", destination);
    router.push("/pasajero/offers");
  };

  const districts = ["Surco", "San Isidro", "Miraflores", "San Borja", "La Molina", "Barranco"];

  return (
    <div className="min-h-screen bg-[#121212] animate-fade-in">
      <header className="px-6 pt-6 pb-4">
        <h1 className="text-3xl font-bold text-white mb-1">Hola, {userName}</h1>
        <p className="text-gray-400 text-sm">¿A dónde quieres ir hoy?</p>
      </header>
      
      <main className="px-6 pb-24">
        <div className="mb-6">
          <div className="h-[40vh] rounded-3xl overflow-hidden shadow-2xl shadow-[#3B82F6]/20 ring-2 ring-[#3B82F6]/10 mb-4">
            <MapView origin={pickupLocation} destination={destination || undefined} />
          </div>
          
          <div className="bg-gradient-to-b from-[#121212] to-[#181818] rounded-3xl border border-[#2a2a2a] p-5 shadow-xl">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-green-400 shadow-lg shadow-green-400/50 flex-shrink-0"></div>
                <div className="flex-1">
                  <p className="text-xs text-gray-400 mb-1.5 font-medium uppercase tracking-wide">Te recogerán en</p>
                  <input
                    type="text"
                    value={pickupLocation}
                    onChange={(e) => setPickupLocation(e.target.value)}
                    className="w-full bg-transparent text-white font-semibold text-base outline-none placeholder-gray-500"
                    placeholder="Tu ubicación actual"
                  />
                </div>
              </div>
              
              <div className="h-px bg-gradient-to-r from-transparent via-[#2a2a2a] to-transparent"></div>
              
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-red-400 shadow-lg shadow-red-400/50 flex-shrink-0"></div>
                <div className="flex-1">
                  <p className="text-xs text-gray-400 mb-1.5 font-medium uppercase tracking-wide">A dónde vas</p>
                  <input
                    type="text"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    onFocus={() => setShowDestinationInput(true)}
                    placeholder="Selecciona tu destino"
                    className="w-full bg-transparent text-white font-semibold text-base outline-none placeholder-gray-500"
                  />
                </div>
              </div>
            </div>
          </div>

          {showDestinationInput && (
            <div className="mt-4 bg-gradient-to-b from-[#121212] to-[#181818] rounded-3xl border border-[#2a2a2a] p-5 shadow-xl animate-slide-up">
              <p className="text-sm text-gray-400 mb-3 font-medium">Selecciona un distrito:</p>
              <div className="grid grid-cols-2 gap-2">
                {districts.map((district) => (
                  <button
                    key={district}
                    onClick={() => {
                      setDestination(district);
                      setShowDestinationInput(false);
                    }}
                    className={`px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 hover:scale-105 active:scale-95 ${
                      destination === district
                        ? "bg-gradient-to-r from-blue-500 to-violet-600 text-white shadow-lg shadow-blue-500/30"
                        : "bg-[#1a1a1a] text-gray-300 hover:bg-[#2a2a2a] border border-[#2a2a2a]"
                    }`}
                  >
                    {district}
                  </button>
                ))}
              </div>
            </div>
          )}

          <button
            onClick={handleSearch}
            disabled={!destination.trim()}
            className={`w-full mt-4 py-4 rounded-full font-semibold transition-all duration-200 active:scale-95 ${
              destination.trim()
                ? "bg-gradient-to-r from-blue-500 to-violet-600 hover:from-blue-400 hover:to-violet-500 text-white shadow-2xl shadow-blue-500/30 hover:shadow-blue-500/50"
                : "bg-[#2a2a2a] text-gray-500 cursor-not-allowed"
            }`}
          >
            Buscar conductores disponibles
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-gradient-to-b from-[#121212] to-[#181818] rounded-2xl border border-[#2a2a2a] p-4 animate-scale-in">
            <div className="text-center">
              <p className="text-xs text-gray-400 mb-1 font-medium">Viajes realizados</p>
              <p className="text-2xl font-bold text-white">{mockPassengerHistory.length}</p>
            </div>
          </div>
          <div className="bg-gradient-to-b from-[#121212] to-[#181818] rounded-2xl border border-[#2a2a2a] p-4 animate-scale-in" style={{ animationDelay: "0.1s" }}>
            <div className="text-center">
              <p className="text-xs text-gray-400 mb-1 font-medium">Total gastado</p>
              <p className="text-2xl font-bold text-[#3B82F6]">S/{mockPassengerHistory.reduce((acc, h) => acc + h.price, 0)}</p>
            </div>
          </div>
        </div>

        {mockPassengerHistory.length > 0 && (
          <div>
            <h2 className="text-lg font-bold text-white mb-4">Viajes recientes</h2>
            <div className="space-y-3">
              {mockPassengerHistory.slice(0, 3).map((history, index) => (
                <div
                  key={history.id}
                  className="bg-gradient-to-b from-[#121212] to-[#181818] rounded-2xl border border-[#2a2a2a] p-4 animate-fade-in hover:border-[#3B82F6]/30 transition-colors"
                  style={{ animationDelay: `${0.2 + index * 0.1}s` }}
                >
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-white">{history.origin} → {history.destination}</p>
                      <p className="text-xs text-gray-400 mt-1">
                        {new Date(history.date).toLocaleDateString("es-PE")} • Con {history.driverName}
                      </p>
                    </div>
                    <p className="text-lg font-bold text-[#3B82F6]">S/{history.price}</p>
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
        )}
      </main>
    </div>
  );
}
