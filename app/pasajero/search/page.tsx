"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import RouteCard from "@/components/RouteCard";
import MockMap from "@/components/MockMap";
import { mockRoutes } from "@/data/mock";

export default function SearchPage() {
  const [searchOrigin, setSearchOrigin] = useState("");
  const [searchDestination, setSearchDestination] = useState("");

  const filteredRoutes = mockRoutes.filter((route) => {
    const originMatch = searchOrigin
      ? route.origin.toLowerCase().includes(searchOrigin.toLowerCase())
      : true;
    const destinationMatch = searchDestination
      ? route.destination.toLowerCase().includes(searchDestination.toLowerCase())
      : true;
    return originMatch && destinationMatch;
  });

  return (
    <div className="min-h-screen bg-[#121212] animate-fade-in">
      <Navbar />
      <main className="px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            Buscar rutas disponibles
          </h1>
          <p className="text-gray-400 text-base">
            Encuentra el viaje compartido perfecto para ti
          </p>
        </div>
        <div className="mb-6">
          <MockMap origin={searchOrigin || undefined} destination={searchDestination || undefined} />
        </div>
        <div className="bg-[#1a1a1a] rounded-xl border border-[#2a2a2a] p-4 mb-6">
          <div className="space-y-4">
            <div>
              <label htmlFor="origin" className="block text-sm font-semibold text-gray-300 mb-2">
                Origen
              </label>
              <input
                type="text"
                id="origin"
                value={searchOrigin}
                onChange={(e) => setSearchOrigin(e.target.value)}
                placeholder="Buscar por origen..."
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
                value={searchDestination}
                onChange={(e) => setSearchDestination(e.target.value)}
                placeholder="Buscar por destino..."
                className="w-full px-4 py-3 bg-[#121212] border border-[#2a2a2a] rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent outline-none transition-all"
              />
            </div>
          </div>
        </div>
        <div>
          {filteredRoutes.length > 0 ? (
            filteredRoutes.map((route) => <RouteCard key={route.id} route={route} />)
          ) : (
            <div className="bg-[#1a1a1a] rounded-xl border border-[#2a2a2a] p-12 text-center">
              <svg className="w-12 h-12 text-gray-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-lg font-semibold text-white mb-2">No se encontraron rutas</p>
              <p className="text-gray-400 text-sm">Intenta ajustar tus criterios de búsqueda</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
