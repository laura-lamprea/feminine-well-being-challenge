import { useState, useEffect } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Activity, CalendarIcon, MessageSquare, Quote } from "lucide-react";
import { wellnessService } from "../services/wellness.service";
import type { WellnessLogModel } from "../types/wellness";
import { Card } from "../components/Shared";

export function WeeklyStats() {
  const [data, setData] = useState<WellnessLogModel[]>([]);
  const [loading, setLoading] = useState(true);

  console.log("WeeklyStats render with data:", data);

  useEffect(() => {
    let active = true;
    wellnessService.getWeeklyStats("user-1234567").then((logs) => {
      if (active) {
        console.log("Fetched weekly stats:", logs);
        setData(logs);
        setLoading(false);
      }
    });
    return () => {
      active = false;
    };
  }, []);

  if (loading)
    return (
      <div className="flex flex-col items-center justify-center h-64 gap-4">
        <div className="w-8 h-8 border-2 border-rose-500/20 border-t-rose-500 rounded-full animate-spin" />
        <p className="text-slate-500 text-sm">Cargando datos del servidor...</p>
      </div>
    );

  if (data.length === 0)
    return (
      <div className="text-center text-slate-500 mt-10">
        No hay datos registrados aún.
      </div>
    );

  function parseDateOnly(dateString: string): Date {
    const [year, month, day] = dateString.split("-").map(Number);
    return new Date(year, month - 1, day);
  }

  const chartData = data.map((log) => {
    const date = parseDateOnly(log.date);

    return {
      ...log,
      dateObj: date,
      day: date.toLocaleDateString("es-ES", { weekday: "short" }).toUpperCase(),
    };
  });

  return (
    <div className="space-y-6 animate-in slide-in-from-right-4 duration-500">
      <Card className="p-5 overflow-hidden">
        <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
          <Activity className="text-rose-400" size={20} />
          Balance Semanal
        </h3>
        <div className="h-64 w-full -ml-4">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="colorEnergy" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#F43F5E" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#F43F5E" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorEmotion" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#334155"
                vertical={false}
                opacity={0.4}
              />
              <XAxis
                dataKey="day"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#94a3b8", fontSize: 10 }}
              />
              <YAxis domain={[0, 5]} hide={false} />{" "}
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1e293b",
                  borderColor: "#334155",
                  borderRadius: "12px",
                  color: "#fff",
                }}
              />
              <Area
                type="monotone"
                dataKey="physicalEnergy"
                stroke="#F43F5E"
                fill="url(#colorEnergy)"
                strokeWidth={3}
                connectNulls
              />
              <Area
                type="monotone"
                dataKey="emotionalState"
                stroke="#8B5CF6"
                fill="url(#colorEmotion)"
                strokeWidth={3}
                connectNulls
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </Card>
      <div className="space-y-4">
        <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest px-1 flex items-center gap-2">
          <MessageSquare className="text-rose-500" size={18} />
          Diario de Notas
        </h3>

        <div className="space-y-3">
          {chartData.map((log, index) => (
            <div
              key={index}
              className="relative pl-6 border-l border-slate-800 ml-3"
            >
              <div className="absolute -left-[5px] top-2 w-2 h-2 rounded-full bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.4)]" />

              <Card className="p-4 group hover:border-slate-700 transition-colors">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-500">
                    <CalendarIcon size={12} className="text-rose-400" />
                    {log.dateObj.toLocaleDateString("es-ES", {
                      day: "numeric",
                      month: "short",
                    })}
                  </div>
                  <div className="flex gap-1">
                    <div
                      title="Ejercicio"
                      className={`w-1.5 h-1.5 rounded-full ${log.exercise ? "bg-emerald-500 shadow-[0_0_5px_rgba(16,185,129,0.5)]" : "bg-slate-800"}`}
                    />
                    <div
                      title="Hidratación"
                      className={`w-1.5 h-1.5 rounded-full ${log.hydration ? "bg-blue-500 shadow-[0_0_5px_rgba(59,130,246,0.5)]" : "bg-slate-800"}`}
                    />
                    <div
                      title="Sueño"
                      className={`w-1.5 h-1.5 rounded-full ${log.sleep ? "bg-indigo-500 shadow-[0_0_5px_rgba(99,102,241,0.5)]" : "bg-slate-800"}`}
                    />
                    <div
                      title="Nutrición"
                      className={`w-1.5 h-1.5 rounded-full ${log.nutrition ? "bg-rose-400 shadow-[0_0_5px_rgba(251,113,133,0.5)]" : "bg-slate-800"}`}
                    />
                  </div>
                </div>

                {log.notes ? (
                  <div className="flex gap-3 items-start">
                    <Quote size={14} className="text-slate-700 shrink-0 mt-1" />
                    <p className="text-sm text-slate-300 italic leading-relaxed">
                      {log.notes}
                    </p>
                  </div>
                ) : (
                  <p className="text-xs text-slate-600 italic">
                    Sin observaciones para este día.
                  </p>
                )}
              </Card>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
