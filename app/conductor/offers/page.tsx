"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import OfferCard from "@/components/OfferCard";
import { generateMockOffers, Offer, calculateEarnings } from "@/data/mock";

export default function ConductorOffersPage() {
  const router = useRouter();
  const [offers, setOffers] = useState<Offer[]>([]);
  const [selectedOffers, setSelectedOffers] = useState<Offer[]>([]);
  const [driverDestination, setDriverDestination] = useState<string>("");
  const [maxSeats, setMaxSeats] = useState<number>(4);

  useEffect(() => {
    const route = localStorage.getItem("currentRoute");
    if (route) {
      try {
        const routeData = JSON.parse(route);
        const dest = routeData.destination || "";
        const districtMatch = dest.match(/(Surco|San Isidro|Miraflores|San Borja|La Molina)/i);
        if (districtMatch) {
          setDriverDestination(districtMatch[1]);
        } else {
          setDriverDestination(dest);
        }
        setMaxSeats(routeData.availableSeats || 4);
      } catch (e) {
        console.error("Error parsing route", e);
      }
    }

    const initialOffers = generateMockOffers();
    setOffers(initialOffers);

    const interval = setInterval(() => {
      setOffers((prev) => {
        const filtered = prev.filter((offer) => {
          const elapsed = Math.floor((Date.now() - offer.createdAt) / 1000);
          return elapsed < offer.expiresIn;
        });

        if (filtered.length < 5) {
          const newOffers = generateMockOffers();
          return [...filtered, ...newOffers].slice(0, 15);
        }

        return filtered;
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const handleSelectOffer = (offer: Offer) => {
    if (selectedOffers.length >= maxSeats) {
      return;
    }

    setSelectedOffers((prev) => [...prev, offer]);
    setOffers((prev) => prev.filter((o) => o.id !== offer.id));
  };

  const handleRemoveOffer = (offerId: string) => {
    setSelectedOffers((prev) => {
      const removed = prev.find((o) => o.id === offerId);
      if (removed) {
        setOffers((prevOffers) => [...prevOffers, removed]);
      }
      return prev.filter((o) => o.id !== offerId);
    });
  };

  const handleStartRoute = () => {
    if (selectedOffers.length === 0) return;

    const route = localStorage.getItem("currentRoute");
    if (route) {
      try {
        const routeData = JSON.parse(route);
        const distanceKm = routeData.distanceKm || 5;
        const totalEarnings = calculateEarnings(distanceKm, selectedOffers.length);
        
        localStorage.setItem("selectedPassengers", JSON.stringify(selectedOffers));
        localStorage.setItem("totalEarnings", totalEarnings.toString());
        
        router.push("/conductor/route");
      } catch (e) {
        console.error("Error parsing route", e);
      }
    }
  };

  const groupedOffers = offers.reduce((acc, offer) => {
    if (!acc[offer.destinationDistrict]) {
      acc[offer.destinationDistrict] = [];
    }
    acc[offer.destinationDistrict].push(offer);
    return acc;
  }, {} as Record<string, Offer[]>);

  return (
    <div className="min-h-screen bg-[#121212] animate-fade-in">
      <Navbar />
      <main className="px-6 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-white mb-2">Ofertas disponibles</h1>
          <p className="text-gray-400 text-base">
            {selectedOffers.length}/{maxSeats} asientos ocupados
          </p>
        </div>

        {selectedOffers.length > 0 && (
          <div className="bg-[#1a1a1a] rounded-xl border border-[#3B82F6] p-4 mb-6">
            <p className="text-sm font-semibold text-white mb-3">Pasajeros seleccionados:</p>
            <div className="space-y-2">
              {selectedOffers.map((offer) => (
                <div
                  key={offer.id}
                  className="flex items-center justify-between bg-[#121212] rounded-lg p-3"
                >
                  <div className="flex-1">
                    <p className="text-sm font-medium text-white">{offer.passengerName}</p>
                    <p className="text-xs text-gray-400">{offer.destinationDistrict}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <p className="text-sm font-bold text-[#3B82F6]">S/{offer.price}</p>
                    <button
                      onClick={() => handleRemoveOffer(offer.id)}
                      className="text-red-400 hover:text-red-300"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
            {selectedOffers.length >= maxSeats && (
              <button
                onClick={handleStartRoute}
                className="w-full mt-4 py-3 bg-[#3B82F6] hover:bg-[#2563EB] text-white font-semibold rounded-lg transition-all duration-200 active:scale-95"
              >
                Iniciar ruta con {selectedOffers.length} pasajero{selectedOffers.length > 1 ? "s" : ""}
              </button>
            )}
          </div>
        )}

        <div className="space-y-6">
          {Object.entries(groupedOffers).map(([district, districtOffers]) => (
            <div key={district}>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-2 h-2 rounded-full bg-red-400"></div>
                <h2 className="text-lg font-bold text-white">{district}</h2>
                <span className="text-sm text-gray-400">({districtOffers.length})</span>
              </div>
              <div className="space-y-2">
                {districtOffers.map((offer) => (
                  <OfferCard
                    key={offer.id}
                    offer={offer}
                    onSelect={handleSelectOffer}
                    driverDestination={driverDestination}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>

        {offers.length === 0 && (
          <div className="text-center py-12">
            <svg className="w-16 h-16 text-gray-600 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <p className="text-gray-400">No hay ofertas disponibles en este momento</p>
          </div>
        )}
      </main>
    </div>
  );
}

