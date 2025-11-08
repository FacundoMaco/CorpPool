import Link from "next/link";
import { Route } from "@/data/mock";

interface RouteCardProps {
  route: Route;
}

export default function RouteCard({ route }: RouteCardProps) {
  return (
    <div className="bg-[#1a1a1a] rounded-xl border border-[#2a2a2a] p-5 mb-4 hover:border-[#3B82F6]/50 transition-all duration-200">
      <div className="flex justify-between items-start mb-4">
        <div>
          <p className="text-xs text-gray-400 mb-1">Conductor</p>
          <p className="font-semibold text-white">{route.driverName}</p>
        </div>
        <div className="text-right">
          <p className="text-xl font-bold text-[#3B82F6]">S/{route.price}</p>
          <p className="text-xs text-gray-400">por persona</p>
        </div>
      </div>
      <div className="space-y-3 mb-4">
        <div className="flex items-start gap-3">
          <div className="w-2 h-2 rounded-full bg-green-400 mt-2"></div>
          <div className="flex-1">
            <p className="text-xs text-gray-400 uppercase mb-1">Origen</p>
            <p className="text-white text-sm font-medium">{route.origin}</p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <div className="w-2 h-2 rounded-full bg-red-400 mt-2"></div>
          <div className="flex-1">
            <p className="text-xs text-gray-400 uppercase mb-1">Destino</p>
            <p className="text-white text-sm font-medium">{route.destination}</p>
          </div>
        </div>
      </div>
      <div className="flex justify-between items-center pt-4 border-t border-[#2a2a2a]">
        <div className="flex items-center gap-4 text-xs text-gray-400">
          <span className="flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {route.departureTime}
          </span>
          <span className="flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            {route.availableSeats} asientos
          </span>
        </div>
        <Link
          href={`/pasajero/match?id=${route.id}`}
          className="bg-[#3B82F6] hover:bg-[#2563EB] text-white font-semibold px-5 py-2 rounded-full text-sm transition-all duration-200 active:scale-95"
        >
          Unirme
        </Link>
      </div>
    </div>
  );
}
