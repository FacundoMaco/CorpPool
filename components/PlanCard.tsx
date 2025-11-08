"use client";

interface PlanCardProps {
  name: string;
  price: number;
  features: string[];
  isPremium: boolean;
  onSelect: () => void;
}

export default function PlanCard({ name, price, features, isPremium, onSelect }: PlanCardProps) {
  return (
    <div
      className={`bg-[#1a1a1a] rounded-2xl border-2 p-6 transition-all duration-200 ${
        isPremium
          ? "border-indigo-500 hover:border-indigo-400 shadow-lg shadow-indigo-500/20"
          : "border-[#2a2a2a] hover:border-indigo-500/50"
      }`}
    >
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-xl font-bold text-white">{name}</h3>
          {isPremium && (
            <span className="bg-indigo-500/20 text-indigo-400 text-xs font-semibold px-2 py-1 rounded-full">
              POPULAR
            </span>
          )}
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-bold text-white">S/{price}</span>
          <span className="text-gray-400 text-sm">/mes</span>
        </div>
      </div>
      <ul className="space-y-3 mb-8">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start gap-3">
            <svg
              className="w-5 h-5 text-indigo-400 mt-0.5 flex-shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span className="text-gray-300 text-sm">{feature}</span>
          </li>
        ))}
      </ul>
      <button
        onClick={onSelect}
        className={`w-full py-3 rounded-full font-semibold transition-all duration-200 active:scale-95 ${
          isPremium
            ? "bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-500/20"
            : "bg-[#2a2a2a] hover:bg-[#333333] text-gray-300 border border-[#2a2a2a]"
        }`}
      >
        {isPremium ? "Elegir Premium" : "Elegir Freemium"}
      </button>
    </div>
  );
}

