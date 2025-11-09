"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import MapView from "@/components/MapView";
import DriverOfferCard from "@/components/DriverOfferCard";
import { generateDriverOffers, DriverOffer } from "@/data/mock";

export default function PasajeroOffersPage() {
  const router = useRouter();
  const [pickupLocation, setPickupLocation] = useState("");
  const [destination, setDestination] = useState("");
  const [offers, setOffers] = useState<DriverOffer[]>([]);
  const [selectedOffer, setSelectedOffer] = useState<DriverOffer | null>(null);
  const [isConfirming, setIsConfirming] = useState(false);

  useEffect(() => {
    const pickup = localStorage.getItem("passengerPickup");
    const dest = localStorage.getItem("passengerDestination");
    
    if (pickup) setPickupLocation(pickup);
    if (dest) {
      setDestination(dest);
      const driverOffers = generateDriverOffers(dest);
      setOffers(driverOffers);
    } else {
      router.push("/pasajero/search");
    }
  }, [router]);

  const handleSelectOffer = (offer: DriverOffer) => {
    setSelectedOffer(offer);
    setIsConfirming(true);
    
    setTimeout(() => {
      localStorage.setItem("selectedDriverOffer", JSON.stringify(offer));
      localStorage.setItem("passengerPickup", pickupLocation);
      localStorage.setItem("passengerDestination", destination);
      router.push("/pasajero/match");
    }, 1500);
  };

  if (isConfirming && selectedOffer) {
    return (
      <div className="min-h-screen bg-[#121212] flex items-center justify-center">
        <div className="text-center px-6">
          <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
            <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Solicitando viaje...</h2>
          <p className="text-gray-400">Esperando confirmación de {selectedOffer.driverName}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#121212] animate-fade-in">
      <Navbar />
      <main className="px-6 py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-white mb-2">Conductores disponibles</h1>
          <p className="text-gray-400 text-sm">
            {pickupLocation} → {destination}
          </p>
        </div>

        <div className="mb-6">
          <MapView origin={pickupLocation} destination={destination} />
        </div>

        <div className="space-y-3">
          {offers.length > 0 ? (
            offers.map((offer) => (
              <DriverOfferCard
                key={offer.id}
                offer={offer}
                onSelect={handleSelectOffer}
              />
            ))
          ) : (
            <div className="bg-[#1a1a1a] rounded-xl border border-[#2a2a2a] p-12 text-center">
              <svg className="w-12 h-12 text-gray-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-lg font-semibold text-white mb-2">No hay conductores disponibles</p>
              <p className="text-gray-400 text-sm">Intenta más tarde o ajusta tu destino</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

