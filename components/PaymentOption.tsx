"use client";

interface PaymentOptionProps {
  type: "yape" | "plin" | "tarjeta" | "efectivo";
  selected?: boolean;
  onSelect: () => void;
}

export default function PaymentOption({ type, selected = false, onSelect }: PaymentOptionProps) {
  const config = {
    yape: {
      name: "Yape",
      icon: (
        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
        </svg>
      ),
      color: "bg-green-500/20 border-green-500/50",
      selectedColor: "bg-green-500/30 border-green-500",
    },
    plin: {
      name: "Plin",
      icon: (
        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
        </svg>
      ),
      color: "bg-blue-500/20 border-blue-500/50",
      selectedColor: "bg-blue-500/30 border-blue-500",
    },
    tarjeta: {
      name: "Tarjeta",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
        </svg>
      ),
      color: "bg-purple-500/20 border-purple-500/50",
      selectedColor: "bg-purple-500/30 border-purple-500",
    },
    efectivo: {
      name: "Efectivo",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      color: "bg-yellow-500/20 border-yellow-500/50",
      selectedColor: "bg-yellow-500/30 border-yellow-500",
    },
  };

  const option = config[type];

  return (
    <button
      onClick={onSelect}
      className={`w-full p-5 rounded-xl border-2 transition-all duration-200 active:scale-95 ${
        selected ? option.selectedColor : option.color
      } ${selected ? "ring-2 ring-offset-2 ring-offset-[#121212] ring-[#3B82F6]" : ""}`}
    >
      <div className="flex items-center gap-4">
        <div className={`${selected ? "text-white" : "text-gray-400"}`}>
          {option.icon}
        </div>
        <span className={`text-lg font-semibold ${selected ? "text-white" : "text-gray-300"}`}>
          {option.name}
        </span>
        {selected && (
          <div className="ml-auto">
            <svg className="w-6 h-6 text-[#3B82F6]" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
          </div>
        )}
      </div>
    </button>
  );
}

