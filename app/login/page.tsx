"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    setTimeout(() => {
      localStorage.setItem("loggedIn", "true");
      localStorage.setItem("userName", formData.name);
      setIsLoading(false);
      router.push("/role");
    }, 500);
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
      <main className="px-6 py-12">
        <div className="text-center mb-10 animate-scale-in">
          <div className="w-20 h-20 bg-[#3B82F6]/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <svg className="w-12 h-12 text-[#3B82F6]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Bienvenido a CorpPool</h1>
          <p className="text-gray-400 text-base">Inicia sesión para continuar</p>
        </div>
        <form onSubmit={handleSubmit} className="bg-[#1a1a1a] rounded-2xl border border-[#2a2a2a] p-6 animate-fade-in" style={{ animationDelay: "0.2s" }}>
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
                placeholder="tu.correo@empresa.com"
                required
                className="w-full px-4 py-3 bg-[#121212] border border-[#2a2a2a] rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent outline-none transition-all"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-gray-300 mb-2">
                Contraseña
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                required
                minLength={6}
                className="w-full px-4 py-3 bg-[#121212] border border-[#2a2a2a] rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent outline-none transition-all"
              />
            </div>
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full mt-8 px-6 py-3 bg-[#3B82F6] hover:bg-[#2563EB] disabled:bg-gray-700 disabled:text-gray-500 disabled:cursor-not-allowed text-white font-semibold rounded-full transition-all duration-200 active:scale-95 shadow-lg shadow-[#3B82F6]/20"
          >
            {isLoading ? "Iniciando sesión..." : "Iniciar sesión"}
          </button>
        </form>
        <p className="text-center text-gray-500 text-xs mt-6 animate-fade-in" style={{ animationDelay: "0.4s" }}>
          Demo: Completa el formulario para continuar
        </p>
      </main>
    </div>
  );
}
