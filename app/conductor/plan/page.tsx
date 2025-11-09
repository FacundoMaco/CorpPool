"use client";

import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import PlanCard from "@/components/PlanCard";

export default function ConductorPlanPage() {
  const router = useRouter();

  const handleSelectFreemium = () => {
    localStorage.setItem("planType", "freemium");
    router.push("/conductor/publish");
  };

  const handleSelectPremium = () => {
    localStorage.setItem("planType", "premium");
    router.push("/conductor/publish");
  };

  return (
    <div className="min-h-screen bg-[#121212]">
      <Navbar />
      <main className="px-6 py-8">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-white mb-2">Elige tu plan</h1>
          <p className="text-gray-400 text-base">Selecciona el plan que mejor se adapte a tus necesidades</p>
        </div>
        <div className="space-y-4">
          <PlanCard
            name="Freemium"
            price={0}
            features={["3 viajes al mes"]}
            isPremium={false}
            onSelect={handleSelectFreemium}
          />
          <PlanCard
            name="Premium"
            price={39.9}
            features={["Viajes ilimitados"]}
            isPremium={true}
            onSelect={handleSelectPremium}
          />
        </div>
      </main>
    </div>
  );
}

