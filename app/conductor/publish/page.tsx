"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import MockMap from "@/components/MockMap";

export default function PublishPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    origin: "",
    destination: "",
    departureTime: "",
    date: "",
    price: "",
    availableSeats: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/conductor/match");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-[#121212] animate-fade-in">
      <Navbar />
      <main className="px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            Publica tu ruta
          </h1>
          <p className="text-gray-400 text-base">
            Comparte tu viaje y ayuda a otros compañeros a llegar al trabajo
          </p>
        </div>
        <div className="mb-6">
          <MockMap origin={formData.origin || undefined} destination={formData.destination || undefined} />
        </div>
        <form onSubmit={handleSubmit} className="bg-[#1a1a1a] rounded-2xl border border-[#2a2a2a] p-6">
          <div className="space-y-5">
            <div>
              <label htmlFor="origin" className="block text-sm font-semibold text-gray-300 mb-2">
                Punto de partida
              </label>
              <input
                type="text"
                id="origin"
                name="origin"
                value={formData.origin}
                onChange={handleChange}
                placeholder="Ej: San Isidro, Lima"
                required
                className="w-full px-4 py-3 bg-[#121212] border border-[#2a2a2a] rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent outline-none transition-all"
              />
            </div>
            <div>
              <label htmlFor="destination" className="block text-sm font-semibold text-gray-300 mb-2">
                Destino
              </label>
              <input
                type="text"
                id="destination"
                name="destination"
                value={formData.destination}
                onChange={handleChange}
                placeholder="Ej: Torre Empresarial, San Borja"
                required
                className="w-full px-4 py-3 bg-[#121212] border border-[#2a2a2a] rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent outline-none transition-all"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="date" className="block text-sm font-semibold text-gray-300 mb-2">
                  Fecha
                </label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-[#121212] border border-[#2a2a2a] rounded-lg text-white focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent outline-none transition-all"
                />
              </div>
              <div>
                <label htmlFor="departureTime" className="block text-sm font-semibold text-gray-300 mb-2">
                  Hora de salida
                </label>
                <input
                  type="time"
                  id="departureTime"
                  name="departureTime"
                  value={formData.departureTime}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-[#121212] border border-[#2a2a2a] rounded-lg text-white focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent outline-none transition-all"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="price" className="block text-sm font-semibold text-gray-300 mb-2">
                  Costo por persona (S/)
                </label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="8"
                  min="0"
                  required
                  className="w-full px-4 py-3 bg-[#121212] border border-[#2a2a2a] rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent outline-none transition-all"
                />
              </div>
              <div>
                <label htmlFor="availableSeats" className="block text-sm font-semibold text-gray-300 mb-2">
                  Asientos disponibles
                </label>
                <input
                  type="number"
                  id="availableSeats"
                  name="availableSeats"
                  value={formData.availableSeats}
                  onChange={handleChange}
                  placeholder="3"
                  min="1"
                  max="8"
                  required
                  className="w-full px-4 py-3 bg-[#121212] border border-[#2a2a2a] rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent outline-none transition-all"
                />
              </div>
            </div>
          </div>
          <div className="mt-8 flex gap-3">
            <button
              type="button"
              onClick={() => router.back()}
              className="flex-1 px-6 py-3 border-2 border-[#2a2a2a] text-gray-300 font-semibold rounded-full hover:bg-[#2a2a2a] transition-all duration-200 active:scale-95"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex-1 px-6 py-3 bg-[#3B82F6] hover:bg-[#2563EB] text-white font-semibold rounded-full transition-all duration-200 active:scale-95 shadow-lg shadow-[#3B82F6]/20"
            >
              Publicar ruta
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
