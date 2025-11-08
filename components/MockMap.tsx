"use client";

interface MockMapProps {
  origin?: string;
  destination?: string;
}

export default function MockMap({ origin, destination }: MockMapProps) {
  const districts = [
    { name: "San Isidro", x: 45, y: 35, color: "bg-green-500" },
    { name: "Miraflores", x: 30, y: 50, color: "bg-blue-500" },
    { name: "San Borja", x: 60, y: 40, color: "bg-purple-500" },
    { name: "Surco", x: 50, y: 60, color: "bg-yellow-500" },
    { name: "La Molina", x: 70, y: 55, color: "bg-pink-500" },
    { name: "Barranco", x: 25, y: 65, color: "bg-orange-500" },
  ];

  const getDistrictPosition = (name: string) => {
    return districts.find((d) => name.toLowerCase().includes(d.name.toLowerCase())) || districts[0];
  };

  const originPos = origin ? getDistrictPosition(origin) : null;
  const destPos = destination ? getDistrictPosition(destination) : null;

  return (
    <div className="relative w-full h-64 bg-gradient-to-br from-[#1a1a1a] via-[#121212] to-[#0a0a0a] rounded-xl border border-[#2a2a2a] overflow-hidden shadow-lg">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_40%,_rgba(59,130,246,0.1),transparent_50%)]"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_60%_60%,_rgba(59,130,246,0.1),transparent_50%)]"></div>
      </div>
      
      {originPos && destPos && (
        <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 5 }}>
          <line
            x1={`${originPos.x}%`}
            y1={`${originPos.y}%`}
            x2={`${destPos.x}%`}
            y2={`${destPos.y}%`}
            stroke="#3B82F6"
            strokeWidth="2"
            strokeDasharray="5,5"
            opacity="0.6"
          />
        </svg>
      )}
      
      {districts.map((district) => {
        const isOrigin = originPos?.name === district.name;
        const isDestination = destPos?.name === district.name;
        const isActive = isOrigin || isDestination;
        
        return (
          <div
            key={district.name}
            className={`absolute ${isActive ? "scale-125 z-10" : "scale-100"} transition-all duration-300`}
            style={{ left: `${district.x}%`, top: `${district.y}%`, transform: "translate(-50%, -50%)" }}
          >
            <div className={`w-3 h-3 ${district.color} rounded-full ${isActive ? "ring-2 ring-[#3B82F6] ring-offset-2 ring-offset-[#121212]" : ""} shadow-lg`}></div>
            {isActive && (
              <div className="absolute top-4 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                <span className="text-xs font-semibold text-white bg-[#1a1a1a] px-2 py-1 rounded border border-[#2a2a2a]">
                  {district.name}
                </span>
              </div>
            )}
          </div>
        );
      })}

      <div className="absolute bottom-2 left-2 right-2 flex justify-between items-center text-xs text-gray-500">
        <span>Lima, Perú</span>
        <span>Mapa simulado</span>
      </div>
    </div>
  );
}
