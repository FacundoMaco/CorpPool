"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import MapView from "@/components/MapView";
import { DriverOffer } from "@/data/mock";

type TripStatus = "waiting" | "driver_coming" | "in_progress" | "arriving" | "completed";

export default function PasajeroRoutePage() {
  const router = useRouter();
  const [selectedOffer, setSelectedOffer] = useState<DriverOffer | null>(null);
  const [pickupLocation, setPickupLocation] = useState("");
  const [destination, setDestination] = useState("");
  const [tripStatus, setTripStatus] = useState<TripStatus>("waiting");
  const [timeRemaining, setTimeRemaining] = useState(5);
  const [showSuccessAnimation, setShowSuccessAnimation] = useState(false);

  useEffect(() => {
    const offerData = localStorage.getItem("selectedDriverOffer");
    const pickup = localStorage.getItem("passengerPickup");
    const dest = localStorage.getItem("passengerDestination");

    if (offerData) {
      try {
        setSelectedOffer(JSON.parse(offerData));
      } catch (e) {
        console.error("Error parsing offer", e);
      }
    }

    if (pickup) setPickupLocation(pickup);
    if (dest) setDestination(dest);

    const statusInterval = setInterval(() => {
      setTripStatus((prev) => {
        if (prev === "waiting") return "driver_coming";
        if (prev === "driver_coming") return "in_progress";
        if (prev === "in_progress") return "arriving";
        return prev;
      });
    }, 8000);

    const timeInterval = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          setTripStatus((currentStatus) => {
            if (currentStatus === "arriving") {
              setTimeout(() => {
                setShowSuccessAnimation(true);
                setTimeout(() => {
                  router.push("/pasajero/rating");
                }, 3000);
              }, 100);
              return "completed";
            }
            return currentStatus;
          });
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      clearInterval(statusInterval);
      clearInterval(timeInterval);
    };
  }, [router]);

  const getStatusInfo = () => {
    switch (tripStatus) {
      case "waiting":
        return {
          title: "Esperando confirmación",
          subtitle: "El conductor está confirmando tu solicitud",
          icon: "⏳",
          color: "text-yellow-400",
        };
      case "driver_coming":
        return {
          title: "Conductor en camino",
          subtitle: `${selectedOffer?.driverName} está yendo a recogerte`,
          icon: "🚗",
          color: "text-blue-400",
        };
      case "in_progress":
        return {
          title: "Viaje en curso",
          subtitle: "Estás en camino a tu destino",
          icon: "📍",
          color: "text-green-400",
        };
      case "arriving":
        return {
          title: "Llegando a destino",
          subtitle: "Estás por llegar",
          icon: "✅",
          color: "text-green-400",
        };
      case "completed":
        return {
          title: "Viaje completado",
          subtitle: "¡Llegaste a tu destino!",
          icon: "🎉",
          color: "text-green-400",
        };
      default:
        return {
          title: "Viaje en curso",
          subtitle: "Estás en camino",
          icon: "📍",
          color: "text-green-400",
        };
    }
  };

  const handleCancelTrip = () => {
    if (confirm("¿Estás seguro de cancelar este viaje?")) {
      localStorage.removeItem("selectedDriverOffer");
      router.push("/pasajero/search");
    }
  };

  const handleFinishTrip = () => {
    router.push("/pasajero/rating");
  };

  if (!selectedOffer) {
    return (
      <div className="min-h-screen bg-[#121212]">
        <Navbar />
        <main className="px-6 py-16 text-center">
          <p className="text-gray-400">Cargando información del viaje...</p>
        </main>
      </div>
    );
  }

  const statusInfo = getStatusInfo();

  if (showSuccessAnimation) {
    return (
      <div className="min-h-screen bg-[#121212] flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-green-500/20 via-blue-500/20 to-purple-500/20 animate-pulse"></div>
        <div className="relative z-10 text-center animate-scale-in">
          <div className="w-32 h-32 mx-auto mb-6 relative">
            <div className="absolute inset-0 bg-green-500 rounded-full animate-ping opacity-75"></div>
            <div className="absolute inset-0 bg-green-500 rounded-full animate-pulse"></div>
            <div className="relative w-full h-full bg-green-500 rounded-full flex items-center justify-center">
              <svg className="w-16 h-16 text-white animate-scale-in" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>
          <h1 className="text-4xl font-bold text-white mb-2 animate-fade-in">¡Llegaste!</h1>
          <p className="text-xl text-gray-300 animate-fade-in" style={{ animationDelay: "0.2s" }}>Viaje completado exitosamente</p>
        </div>
        <div className="absolute top-1/4 left-1/4 w-4 h-4 bg-yellow-400 rounded-full animate-bounce" style={{ animationDelay: "0s", animationDuration: "1s" }}></div>
        <div className="absolute top-1/3 right-1/4 w-3 h-3 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s", animationDuration: "1.2s" }}></div>
        <div className="absolute bottom-1/4 left-1/3 w-5 h-5 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: "0.4s", animationDuration: "1.1s" }}></div>
        <div className="absolute top-1/2 right-1/3 w-4 h-4 bg-green-400 rounded-full animate-bounce" style={{ animationDelay: "0.6s", animationDuration: "1.3s" }}></div>
        <div className="absolute bottom-1/3 right-1/5 w-3 h-3 bg-pink-400 rounded-full animate-bounce" style={{ animationDelay: "0.8s", animationDuration: "1s" }}></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#121212]">
      <Navbar />
      <main className="px-6 py-8 pb-24">
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-4xl">{statusInfo.icon}</span>
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-white">{statusInfo.title}</h1>
              <p className={`text-sm text-gray-400 ${statusInfo.color}`}>{statusInfo.subtitle}</p>
            </div>
          </div>
          {tripStatus !== "waiting" && (
            <div className="mt-3 flex items-center gap-2 text-sm text-gray-400">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Tiempo estimado: {timeRemaining} min</span>
            </div>
          )}
        </div>

          <div className="mb-6">
          <div className="rounded-3xl overflow-hidden shadow-2xl shadow-[#3B82F6]/20 ring-2 ring-[#3B82F6]/10">
            <MapView origin={pickupLocation} destination={destination} distanceKm={selectedOffer.distanceKm} durationMin={selectedOffer.durationMin} />
          </div>
        </div>

        <div className="bg-gradient-to-b from-[#121212] to-[#181818] rounded-3xl border border-[#2a2a2a] p-6 mb-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-[#3B82F6]/20 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-[#3B82F6]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <div>
                <p className="font-semibold text-white">{selectedOffer.driverName}</p>
                <div className="flex items-center gap-1">
                  <svg className="w-3 h-3 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                  <span className="text-xs text-gray-400">{selectedOffer.driverRating.toFixed(1)}</span>
                </div>
              </div>
            </div>
            <button className="p-2 bg-[#3B82F6]/20 rounded-lg hover:bg-[#3B82F6]/30 transition-colors">
              <svg className="w-5 h-5 text-[#3B82F6]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </button>
          </div>
          {selectedOffer.vehicleInfo && (
            <div className="flex items-center gap-2 text-xs text-gray-400 pt-3 border-t border-[#2a2a2a]">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{selectedOffer.vehicleInfo}</span>
            </div>
          )}
          </div>

        <div className="bg-gradient-to-b from-[#121212] to-[#181818] rounded-3xl border border-[#2a2a2a] p-6 mb-4">
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="relative flex flex-col items-center">
                <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse shadow-lg shadow-green-400/50"></div>
                <div className="w-0.5 h-8 bg-gradient-to-b from-green-400/50 to-transparent mt-1"></div>
              </div>
              <div className="flex-1 pt-0.5">
                <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">Recogida</p>
                <p className="text-base text-white font-semibold">{pickupLocation}</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-3 h-3 rounded-full bg-red-400 shadow-lg shadow-red-400/50"></div>
              <div className="flex-1 pt-0.5">
                <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">Destino</p>
                <p className="text-base text-white font-semibold">{destination}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-b from-[#121212] to-[#181818] rounded-3xl border border-[#2a2a2a] p-6 mb-6">
          <div className="flex justify-between items-center">
            <p className="text-sm text-gray-400 font-medium">Precio del viaje</p>
            <p className="text-2xl font-bold text-[#3B82F6]">S/{selectedOffer.price}</p>
          </div>
        </div>

        {tripStatus === "arriving" ? (
          <button
            onClick={handleFinishTrip}
            className="w-full px-6 py-4 bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-500 hover:to-blue-500 text-white font-semibold rounded-full transition-all duration-200 active:scale-95 shadow-2xl shadow-violet-500/30 hover:shadow-violet-500/50"
          >
            Finalizar viaje
          </button>
        ) : (
        <button
            onClick={handleCancelTrip}
            className="w-full px-6 py-3 border-2 border-red-500/50 text-red-400 font-semibold rounded-full hover:bg-red-500/10 transition-all duration-200 active:scale-95"
        >
            Cancelar viaje
        </button>
        )}
      </main>
    </div>
  );
}

