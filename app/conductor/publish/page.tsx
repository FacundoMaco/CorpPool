"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import MapView from "@/components/MapView";
import { Route } from "@/data/mock";

export default function PublishPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    origin: "",
    destination: "",
    departureTime: "",
    availableSeats: "1",
    price: "5",
  });
  const [driverName, setDriverName] = useState("Conductor");

  useEffect(() => {
    const driverData = localStorage.getItem("driverData");
    if (driverData) {
      try {
        const data = JSON.parse(driverData);
        if (data.name) {
          setDriverName(data.name);
        }
      } catch (e) {
        console.error("Error parsing driverData", e);
      }
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const existingRoutes = localStorage.getItem("routes");
    const routes: Route[] = existingRoutes ? JSON.parse(existingRoutes) : [];
    
    const newRoute: Route = {
      id: `route-${Date.now()}`,
      driverName: driverName,
      origin: formData.origin,
      destination: formData.destination,
      departureTime: formData.departureTime,
      price: Number(formData.price),
      availableSeats: Number(formData.availableSeats),
      date: new Date().toISOString().split("T")[0],
      distanceKm: 5,
      durationMin: 15,
    };
    
    routes.push(newRoute);
    localStorage.setItem("routes", JSON.stringify(routes));
    localStorage.setItem("currentRoute", JSON.stringify(newRoute));
    
    router.push("/conductor/offers");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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
          <MapView origin={formData.origin || undefined} destination={formData.destination || undefined} />
        </div>
        <form onSubmit={handleSubmit} className="bg-[#1a1a1a] rounded-2xl border border-[#2a2a2a] p-6">
          <div className="space-y-5">
            <div>
              <label htmlFor="origin" className="block text-sm font-semibold text-gray-300 mb-2">
                Distrito de origen
              </label>
              <select
                id="origin"
                name="origin"
                value={formData.origin}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-[#121212] border border-[#2a2a2a] rounded-lg text-white focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent outline-none transition-all"
              >
                <option value="">Selecciona un distrito</option>
                <option value="Surco">Surco</option>
                <option value="Miraflores">Miraflores</option>
                <option value="San Borja">San Borja</option>
                <option value="La Molina">La Molina</option>
                <option value="San Isidro">San Isidro</option>
              </select>
            </div>
            <div>
              <label htmlFor="destination" className="block text-sm font-semibold text-gray-300 mb-2">
                Destino
              </label>
              <select
                id="destination"
                name="destination"
                value={formData.destination}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-[#121212] border border-[#2a2a2a] rounded-lg text-white focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent outline-none transition-all"
              >
                <option value="">Selecciona un destino</option>
                <option value="Centro Empresarial San Isidro">Centro Empresarial San Isidro</option>
                <option value="Surco">Surco</option>
                <option value="Miraflores">Miraflores</option>
                <option value="San Borja">San Borja</option>
                <option value="La Molina">La Molina</option>
                <option value="San Isidro">San Isidro</option>
              </select>
            </div>
            <div className="grid grid-cols-2 gap-4">
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
              <div>
                <label htmlFor="availableSeats" className="block text-sm font-semibold text-gray-300 mb-2">
                  Número de asientos
                </label>
                <select
                  id="availableSeats"
                  name="availableSeats"
                  value={formData.availableSeats}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-[#121212] border border-[#2a2a2a] rounded-lg text-white focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent outline-none transition-all"
                >
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                </select>
              </div>
            </div>
            <div>
              <label htmlFor="price" className="block text-sm font-semibold text-gray-300 mb-2">
                Precio (S/)
              </label>
              <select
                id="price"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-[#121212] border border-[#2a2a2a] rounded-lg text-white focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent outline-none transition-all"
              >
                <option value="5">S/5</option>
                <option value="6">S/6</option>
                <option value="7">S/7</option>
              </select>
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
