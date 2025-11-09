"use client";

import { DriverOffer } from "@/data/mock";

interface DriverOfferCardProps {
  offer: DriverOffer;
  onSelect: (offer: DriverOffer) => void;
}

export default function DriverOfferCard({ offer, onSelect }: DriverOfferCardProps) {
  return (
    <div className="bg-[#1a1a1a] rounded-xl border-2 border-[#2a2a2a] p-4 mb-3 hover:border-[#3B82F6]/50 transition-all duration-200">
      <div className="flex justify-between items-start mb-3">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <p className="font-semibold text-white text-lg">{offer.driverName}</p>
            <div className="flex items-center gap-1">
              <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
              <span className="text-xs text-gray-400">{offer.driverRating.toFixed(1)}</span>
            </div>
          </div>
          {offer.vehicleInfo && (
            <p className="text-xs text-gray-400 mb-2">{offer.vehicleInfo}</p>
          )}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-400"></div>
              <p className="text-sm text-gray-300">{offer.origin}</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-red-400"></div>
              <p className="text-sm text-gray-300">{offer.destination}</p>
            </div>
          </div>
        </div>
        <div className="text-right ml-4">
          <p className="text-xl font-bold text-[#3B82F6] mb-1">S/{offer.price}</p>
          <p className="text-xs text-gray-400">por persona</p>
        </div>
      </div>
      
      <div className="flex items-center justify-between pt-3 border-t border-[#2a2a2a]">
        <div className="flex items-center gap-4 text-xs text-gray-400">
          <span className="flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {offer.departureTime}
          </span>
          <span className="flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {offer.distanceKm} km
          </span>
          <span className="flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            {offer.availableSeats} asientos
          </span>
        </div>
        <button
          onClick={() => onSelect(offer)}
          className="px-5 py-2 bg-[#3B82F6] hover:bg-[#2563EB] text-white font-semibold rounded-lg text-sm transition-all duration-200 active:scale-95"
        >
          Elegir
        </button>
      </div>
    </div>
  );
}

