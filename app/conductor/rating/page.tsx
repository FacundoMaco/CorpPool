"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import RatingStars from "@/components/RatingStars";
import { mockPassengers } from "@/data/mock";

export default function ConductorRatingPage() {
  const router = useRouter();
  const [ratings, setRatings] = useState<Record<string, number>>({});

  const handleRatingChange = (passengerId: string, rating: number) => {
    setRatings({
      ...ratings,
      [passengerId]: rating,
    });
  };

  const handleSubmit = () => {
    router.push("/conductor/profile");
  };

  const allRated = mockPassengers.every((passenger) => ratings[passenger.id] > 0);

  return (
    <div className="min-h-screen bg-[#121212]">
      <Navbar />
      <main className="px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Califica a tus pasajeros</h1>
          <p className="text-gray-400 text-base">Ayuda a mejorar la comunidad</p>
        </div>
        <div className="space-y-4 mb-8">
          {mockPassengers.map((passenger) => (
            <div key={passenger.id} className="bg-[#1a1a1a] rounded-xl border border-[#2a2a2a] p-5">
              <div className="mb-4">
                <p className="text-lg font-semibold text-white mb-1">{passenger.name}</p>
                <p className="text-sm text-gray-400">{passenger.pickupLocation}</p>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-300">Calificación</p>
                <RatingStars
                  initialRating={ratings[passenger.id] || 0}
                  onRatingChange={(rating) => handleRatingChange(passenger.id, rating)}
                />
              </div>
            </div>
          ))}
        </div>
        <button
          onClick={handleSubmit}
          disabled={!allRated}
          className={`w-full px-6 py-3 font-semibold rounded-full transition-all duration-200 active:scale-95 ${
            allRated
              ? "bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-500/20"
              : "bg-[#2a2a2a] text-gray-500 cursor-not-allowed"
          }`}
        >
          Continuar
        </button>
      </main>
    </div>
  );
}
