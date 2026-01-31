import { BarChart2, Heart, PlusCircle } from "lucide-react";
import { useState } from "react";
import { LogWellnessForm } from "./features/LogWellnessForm";
import { WeeklyStats } from "./features/WeeklyStats";

export default function App() {
  const [view, setView] = useState<"log" | "stats">("log");

  return (
    <div className="min-h-screen bg-[#0f1115] text-slate-200">
      <div className="max-w-md mx-auto min-h-screen flex flex-col p-6">
        <header className="mb-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-rose-400 to-violet-400 bg-clip-text text-transparent">
              Wellness
            </h1>
            <Heart className="text-rose-500" fill="currentColor" />
          </div>
          <div className="flex bg-[#1A1D23] p-1 rounded-xl border border-slate-800">
            <button
              onClick={() => setView("log")}
              className={`flex-1 py-3 rounded-lg flex items-center justify-center gap-2 text-sm font-bold ${view === "log" ? "bg-slate-800 text-white" : "text-slate-500"}`}
            >
              <PlusCircle size={18} /> Registrar
            </button>
            <button
              onClick={() => setView("stats")}
              className={`flex-1 py-3 rounded-lg flex items-center justify-center gap-2 text-sm font-bold ${view === "stats" ? "bg-slate-800 text-white" : "text-slate-500"}`}
            >
              <BarChart2 size={18} /> Estadísticas
            </button>
          </div>
        </header>

        <main className="flex-1">
          {view === "log" ? <LogWellnessForm /> : <WeeklyStats />}
        </main>
      </div>
    </div>
  );
}
