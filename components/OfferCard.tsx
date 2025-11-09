"use client";

import { useEffect, useState } from "react";
import { Offer } from "@/data/mock";

interface OfferCardProps {
  offer: Offer;
  onSelect: (offer: Offer) => void;
  driverDestination?: string;
}

export default function OfferCard({ offer, onSelect, driverDestination }: OfferCardProps) {
  const [timeLeft, setTimeLeft] = useState(() => {
    const elapsed = Math.floor((Date.now() - offer.createdAt) / 1000);
    return Math.max(0, offer.expiresIn - elapsed);
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          return 0;
        }
        const elapsed = Math.floor((Date.now() - offer.createdAt) / 1000);
        return Math.max(0, offer.expiresIn - elapsed);
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [offer.createdAt, offer.expiresIn]);

  const isExpired = timeLeft <= 0;
  const isPreferred = driverDestination && offer.destinationDistrict.toLowerCase().includes(driverDestination.toLowerCase());

  if (isExpired) {
    return null;
  }

  return (
    <div
      className={`bg-[#1a1a1a] rounded-xl border-2 p-4 mb-3 transition-all duration-200 ${
        isPreferred ? "border-[#3B82F6] shadow-lg shadow-[#3B82F6]/20" : "border-[#2a2a2a] hover:border-[#3B82F6]/50"
      }`}
    >
      <div className="flex justify-between items-start mb-3">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <p className="font-semibold text-white">{offer.passengerName}</p>
            <div className="flex items-center gap-1">
              <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
              <span className="text-xs text-gray-400">{offer.passengerRating.toFixed(1)}</span>
            </div>
          </div>
          <p className="text-xs text-gray-400 mb-2">{offer.pickupLocation}</p>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-red-400"></div>
            <p className="text-sm text-white font-medium">{offer.destinationDistrict}</p>
          </div>
        </div>
        <div className="text-right ml-4">
          <p className="text-lg font-bold text-[#3B82F6] mb-1">S/{offer.price}</p>
          <div className="flex items-center gap-1 text-xs text-gray-400">
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{timeLeft}s</span>
          </div>
        </div>
      </div>
      {isPreferred && (
        <div className="mb-3">
          <span className="text-xs bg-[#3B82F6]/20 text-[#3B82F6] px-2 py-1 rounded-full">
            Coincide con tu destino
          </span>
        </div>
      )}
      <button
        onClick={() => onSelect(offer)}
        className="w-full py-2 bg-[#3B82F6] hover:bg-[#2563EB] text-white font-semibold rounded-lg transition-all duration-200 active:scale-95 text-sm"
      >
        Aceptar oferta
      </button>
    </div>
  );
}

