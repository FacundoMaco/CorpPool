"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import MapView from "@/components/MapView";

export default function SearchPage() {
  const router = useRouter();
  const [pickupLocation, setPickupLocation] = useState("Surco, Lima");
  const [destination, setDestination] = useState("");
  const [showDestinationInput, setShowDestinationInput] = useState(false);

  const handleSearch = () => {
    if (!destination.trim()) {
      setShowDestinationInput(true);
      return;
    }
    
    localStorage.setItem("passengerPickup", pickupLocation);
    localStorage.setItem("passengerDestination", destination);
    router.push("/pasajero/offers");
  };

  return (
    <div className="min-h-screen bg-[#121212] animate-fade-in">
      <Navbar />
      <main className="relative">
        <div className="h-[60vh] mb-4">
          <MapView origin={pickupLocation} destination={destination || undefined} />
        </div>
        
        <div className="px-6 pb-8">
          <div className="bg-[#1a1a1a]/80 backdrop-blur-sm rounded-2xl border border-[#2a2a2a] p-5 mb-4 shadow-lg">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-green-400 shadow-lg shadow-green-400/50"></div>
                <div className="flex-1">
                  <p className="text-xs text-gray-400 mb-1.5 font-medium">Te recogerán en</p>
                  <input
                    type="text"
                    value={pickupLocation}
                    onChange={(e) => setPickupLocation(e.target.value)}
                    className="w-full bg-transparent text-white font-semibold text-base outline-none placeholder-gray-500"
                    placeholder="Tu ubicación actual"
                  />
                </div>
              </div>
              
              <div className="h-px bg-[#2a2a2a]"></div>
              
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-red-400 shadow-lg shadow-red-400/50"></div>
                <div className="flex-1">
                  <p className="text-xs text-gray-400 mb-1.5 font-medium">A dónde vas</p>
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
            <div className="bg-[#1a1a1a]/80 backdrop-blur-sm rounded-2xl border border-[#2a2a2a] p-5 mb-4 shadow-lg animate-slide-up">
              <p className="text-sm text-gray-400 mb-3 font-medium">Selecciona un distrito:</p>
              <div className="grid grid-cols-2 gap-2">
                {["Surco", "San Isidro", "Miraflores", "San Borja", "La Molina", "Barranco"].map((district) => (
                  <button
                    key={district}
                    onClick={() => {
                      setDestination(district);
                      setShowDestinationInput(false);
                    }}
                    className={`px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 hover:scale-105 active:scale-95 ${
                      destination === district
                        ? "bg-gradient-to-r from-blue-500 to-violet-600 text-white shadow-lg shadow-blue-500/30"
                        : "bg-[#121212] text-gray-300 hover:bg-[#2a2a2a] border border-[#2a2a2a]"
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
            className="w-full py-4 bg-gradient-to-r from-blue-500 to-violet-600 hover:from-blue-400 hover:to-violet-500 text-white font-semibold rounded-full transition-all duration-200 active:scale-95 shadow-2xl shadow-blue-500/30 hover:shadow-blue-500/50"
          >
            Buscar conductores disponibles
          </button>
        </div>
      </main>
    </div>
  );
}
