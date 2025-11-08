"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";

export default function PasajeroRegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    paymentMethod: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/pasajero/search");
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
          <h1 className="text-3xl font-bold text-white mb-2">Registro de Pasajero</h1>
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
                placeholder="Juan Pérez"
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
                placeholder="juan.perez@email.com"
                required
                className="w-full px-4 py-3 bg-[#121212] border border-[#2a2a2a] rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent outline-none transition-all"
              />
            </div>
            <div>
              <label htmlFor="phone" className="block text-sm font-semibold text-gray-300 mb-2">
                Teléfono
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
              <label htmlFor="paymentMethod" className="block text-sm font-semibold text-gray-300 mb-2">
                Método de pago
              </label>
              <select
                id="paymentMethod"
                name="paymentMethod"
                value={formData.paymentMethod}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-[#121212] border border-[#2a2a2a] rounded-lg text-white focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent outline-none transition-all"
              >
                <option value="">Selecciona un método</option>
                <option value="yape">Yape</option>
                <option value="plin">Plin</option>
                <option value="tarjeta">Tarjeta</option>
                <option value="efectivo">Efectivo</option>
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
              Continuar
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}

