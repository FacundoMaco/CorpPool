"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import RatingStars from "@/components/RatingStars";
import { mockRoutes } from "@/data/mock";

export default function PasajeroRatingPage() {
  const router = useRouter();
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const driver = mockRoutes[0];

  const handleSubmit = () => {
    router.push("/pasajero/profile");
  };

  return (
    <div className="min-h-screen bg-[#121212]">
      <Navbar />
      <main className="px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Califica tu viaje</h1>
          <p className="text-gray-400 text-base">Comparte tu experiencia con el conductor</p>
        </div>
        <div className="bg-[#1a1a1a] rounded-2xl border border-[#2a2a2a] p-6 mb-6">
          <div className="mb-6">
            <p className="text-lg font-semibold text-white mb-1">{driver.driverName}</p>
            <p className="text-sm text-gray-400">{driver.origin} → {driver.destination}</p>
          </div>
          <div className="mb-6">
            <p className="text-sm text-gray-300 mb-4">Calificación</p>
            <div className="flex justify-center">
              <RatingStars initialRating={rating} onRatingChange={setRating} />
            </div>
          </div>
          <div>
            <label htmlFor="review" className="block text-sm text-gray-300 mb-2">
              Reseña (opcional)
            </label>
            <textarea
              id="review"
              value={review}
              onChange={(e) => setReview(e.target.value)}
              placeholder="Comparte tu experiencia..."
              rows={4}
              className="w-full px-4 py-3 bg-[#121212] border border-[#2a2a2a] rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all resize-none"
            />
          </div>
        </div>
        <button
          onClick={handleSubmit}
          disabled={rating === 0}
          className={`w-full px-6 py-3 font-semibold rounded-full transition-all duration-200 active:scale-95 ${
            rating > 0
              ? "bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-500/20"
              : "bg-[#2a2a2a] text-gray-500 cursor-not-allowed"
          }`}
        >
          Enviar calificación
        </button>
      </main>
    </div>
  );
}

