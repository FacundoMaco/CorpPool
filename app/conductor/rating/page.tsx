"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import RatingStars from "@/components/RatingStars";
import { Offer } from "@/data/mock";

export default function ConductorRatingPage() {
  const router = useRouter();
  const [ratings, setRatings] = useState<Record<string, number>>({});
  const [selectedPassengers, setSelectedPassengers] = useState<Offer[]>([]);

  useEffect(() => {
    const passengers = localStorage.getItem("selectedPassengers");
    if (passengers) {
      try {
        const parsed = JSON.parse(passengers);
        setSelectedPassengers(parsed);
      } catch (e) {
        console.error("Error parsing passengers", e);
      }
    } else {
      router.push("/conductor/dashboard");
    }
  }, [router]);

  const handleRatingChange = (passengerId: string, rating: number) => {
    setRatings({
      ...ratings,
      [passengerId]: rating,
    });
  };

  const handleSubmit = () => {
    localStorage.removeItem("selectedPassengers");
    localStorage.removeItem("currentRoute");
    localStorage.removeItem("totalEarnings");
    router.push("/conductor/profile");
  };

  const allRated = selectedPassengers.length > 0 && selectedPassengers.every((passenger) => ratings[passenger.id] > 0);

  if (selectedPassengers.length === 0) {
    return (
      <div className="min-h-screen bg-[#121212]">
        <Navbar />
        <main className="px-6 py-8 pb-24">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">Califica a tus pasajeros</h1>
            <p className="text-gray-400 text-base">Ayuda a mejorar la comunidad</p>
          </div>
          <div className="bg-[#1a1a1a] rounded-xl border border-[#2a2a2a] p-6 text-center">
            <p className="text-gray-400">No hay pasajeros para calificar</p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#121212]">
      <Navbar />
      <main className="px-6 py-8 pb-24">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Califica a tus pasajeros</h1>
          <p className="text-gray-400 text-base">Ayuda a mejorar la comunidad</p>
        </div>
        <div className="space-y-4 mb-8">
          {selectedPassengers.map((passenger) => (
            <div key={passenger.id} className="bg-gradient-to-b from-[#121212] to-[#181818] rounded-3xl border border-[#2a2a2a] p-5">
              <div className="mb-4">
                <p className="text-lg font-semibold text-white mb-1">{passenger.passengerName}</p>
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
          className={`w-full px-6 py-4 font-semibold rounded-full transition-all duration-200 active:scale-95 ${
            allRated
              ? "bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-500 hover:to-blue-500 text-white shadow-2xl shadow-violet-500/30"
              : "bg-[#2a2a2a] text-gray-500 cursor-not-allowed"
          }`}
        >
          Continuar
        </button>
      </main>
    </div>
  );
}
