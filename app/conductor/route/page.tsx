"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import MapView from "@/components/MapView";
import { calculateEarnings, Offer } from "@/data/mock";

export default function ConductorRoutePage() {
  const router = useRouter();
  const [selectedPassengers, setSelectedPassengers] = useState<Offer[]>([]);
  const [origin, setOrigin] = useState("Av. Javier Prado Este, San Isidro, Lima");
  const [destination, setDestination] = useState("Centro Empresarial San Isidro, Lima");
  const [distanceKm, setDistanceKm] = useState(4.8);
  const [durationMin, setDurationMin] = useState(12);
  const [totalEarnings, setTotalEarnings] = useState(0);

  useEffect(() => {
    const passengers = localStorage.getItem("selectedPassengers");
    const route = localStorage.getItem("currentRoute");
    const earnings = localStorage.getItem("totalEarnings");

    if (passengers) {
      try {
        const parsed = JSON.parse(passengers);
        setSelectedPassengers(parsed);
        
        if (earnings) {
          setTotalEarnings(Number(earnings));
        } else {
          const routeData = route ? JSON.parse(route) : null;
          const dist = routeData?.distanceKm || distanceKm;
          setTotalEarnings(calculateEarnings(dist, parsed.length));
        }
      } catch (e) {
        console.error("Error parsing passengers", e);
      }
    }

    if (route) {
      try {
        const parsed = JSON.parse(route);
        setOrigin(parsed.origin || origin);
        setDestination(parsed.destination || destination);
        setDistanceKm(parsed.distanceKm || distanceKm);
        setDurationMin(parsed.durationMin || durationMin);
      } catch (e) {
        console.error("Error parsing route", e);
      }
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#121212]">
      <Navbar />
      <main className="px-6 py-8 pb-24">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Ruta completa</h1>
          <p className="text-gray-400 text-base">Gestiona tus pasajeros y paradas</p>
        </div>
        <div className="bg-gradient-to-b from-[#121212] to-[#181818] rounded-3xl border border-[#2a2a2a] p-6 mb-6">
          <div className="mb-6">
            <div className="rounded-3xl overflow-hidden shadow-2xl shadow-[#3B82F6]/20 ring-2 ring-[#3B82F6]/10">
              <MapView origin={origin} destination={destination} distanceKm={distanceKm} durationMin={durationMin} />
            </div>
          </div>
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="relative flex flex-col items-center">
                <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse shadow-lg shadow-green-400/50"></div>
                <div className="w-0.5 h-8 bg-gradient-to-b from-green-400/50 to-transparent mt-1"></div>
              </div>
              <div className="flex-1 pt-0.5">
                <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">Origen</p>
                <p className="text-white text-sm font-semibold">{origin}</p>
              </div>
            </div>
            {selectedPassengers.map((passenger, index) => (
              <div key={passenger.id} className="flex items-start gap-4 pl-4 border-l-2 border-indigo-500/30">
                <div className="w-3 h-3 rounded-full bg-indigo-400 mt-2 shadow-lg shadow-indigo-400/50"></div>
                <div className="flex-1 pt-0.5">
                  <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">Parada {index + 1}</p>
                  <p className="text-white text-sm font-semibold mb-1">{passenger.passengerName}</p>
                  <p className="text-gray-400 text-xs">{passenger.pickupLocation}</p>
                </div>
              </div>
            ))}
            <div className="flex items-start gap-4">
              <div className="w-3 h-3 rounded-full bg-red-400 shadow-lg shadow-red-400/50"></div>
              <div className="flex-1 pt-0.5">
                <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">Destino</p>
                <p className="text-white text-sm font-semibold">{destination}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-gradient-to-b from-[#121212] to-[#181818] rounded-3xl border border-[#2a2a2a] p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <p className="text-sm text-gray-400 font-medium">Total de pasajeros</p>
            <p className="text-lg font-bold text-white">{selectedPassengers.length}</p>
          </div>
          <div className="flex justify-between items-center pt-4 border-t border-[#2a2a2a]">
            <p className="text-sm text-gray-400 font-medium">Ganancia total</p>
            <p className="text-xl font-bold text-indigo-400">S/{totalEarnings}</p>
          </div>
        </div>
        <button
          onClick={() => router.push("/conductor/rating")}
          className="w-full px-6 py-4 bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-500 hover:to-blue-500 text-white font-semibold rounded-full transition-all duration-200 active:scale-95 shadow-2xl shadow-violet-500/30 hover:shadow-violet-500/50 mb-4"
        >
          Finalizar viaje y calificar
        </button>
      </main>
    </div>
  );
}

