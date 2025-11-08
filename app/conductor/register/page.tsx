"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";

export default function ConductorRegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    plate: "",
    vehicle: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/conductor/publish");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-[#121212]">
      <Navbar />
      <main className="px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Registro de Conductor</h1>
          <p className="text-gray-400 text-base">Completa tu información para comenzar</p>
        </div>
        <form onSubmit={handleSubmit} className="bg-[#1a1a1a] rounded-2xl border border-[#2a2a2a] p-6">
          <div className="space-y-5">
            <div>
              <label htmlFor="name" className="block text-sm font-semibold text-gray-300 mb-2">
                Nombre completo
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="María González"
                required
                className="w-full px-4 py-3 bg-[#121212] border border-[#2a2a2a] rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent outline-none transition-all"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-gray-300 mb-2">
                Correo electrónico
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="maria.gonzalez@empresa.com"
                required
                className="w-full px-4 py-3 bg-[#121212] border border-[#2a2a2a] rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent outline-none transition-all"
              />
            </div>
            <div>
              <label htmlFor="phone" className="block text-sm font-semibold text-gray-300 mb-2">
                Celular
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+51 987 654 321"
                required
                className="w-full px-4 py-3 bg-[#121212] border border-[#2a2a2a] rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent outline-none transition-all"
              />
            </div>
            <div>
              <label htmlFor="company" className="block text-sm font-semibold text-gray-300 mb-2">
                Empresa
              </label>
              <input
                type="text"
                id="company"
                name="company"
                value={formData.company}
                onChange={handleChange}
                placeholder="Nombre de tu empresa"
                required
                className="w-full px-4 py-3 bg-[#121212] border border-[#2a2a2a] rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent outline-none transition-all"
              />
            </div>
            <div>
              <label htmlFor="plate" className="block text-sm font-semibold text-gray-300 mb-2">
                Placa del vehículo
              </label>
              <input
                type="text"
                id="plate"
                name="plate"
                value={formData.plate}
                onChange={handleChange}
                placeholder="ABC-1234"
                className="w-full px-4 py-3 bg-[#121212] border border-[#2a2a2a] rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent outline-none transition-all"
              />
            </div>
            <div>
              <label htmlFor="vehicle" className="block text-sm font-semibold text-gray-300 mb-2">
                Vehículo (opcional)
              </label>
              <input
                type="text"
                id="vehicle"
                name="vehicle"
                value={formData.vehicle}
                onChange={handleChange}
                placeholder="Ej: Toyota Corolla 2020"
                className="w-full px-4 py-3 bg-[#121212] border border-[#2a2a2a] rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent outline-none transition-all"
              />
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
              Continuar
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}

