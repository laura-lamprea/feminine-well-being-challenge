import React, { useEffect, useState } from "react";
import {
  Calendar,
  Zap,
  Smile,
  Activity,
  Utensils,
  Send,
  CheckCircle2,
  Moon,
  Droplets,
} from "lucide-react";
import { wellnessService } from "../services/wellness.service";
import type { HabitsModel } from "../types/wellness";
import { Card, Label, RatingSelector } from "../components/Shared";
import { getOrUserId } from "../hooks/auth";

export function LogWellnessForm() {
  const userId = getOrUserId();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const [date, setDate] = useState(todayLocalISO());
  const [energy, setEnergy] = useState(3);
  const [emotion, setEmotion] = useState(3);

  const [habits, setHabits] = useState<HabitsModel>({
    exercise: false,
    hydration: false,
    sleep: false,
    nutrition: false,
  });

  const [notes, setNotes] = useState("");

  useEffect(() => {
    const fetchTodayData = async () => {
      const stats = await wellnessService.getWeeklyStats(userId, date);

      const todayRecord = stats.find((s) => {
        const recordDate = new Date(s.date).toISOString().split("T")[0];
        return recordDate === date;
      });

      if (todayRecord) {
        setEnergy(todayRecord.physicalEnergy);
        setEmotion(todayRecord.emotionalState);
        setNotes(todayRecord.notes || "");
        setHabits({
          exercise: todayRecord.exercise,
          hydration: todayRecord.hydration,
          sleep: todayRecord.sleep,
          nutrition: todayRecord.nutrition,
        });
      } else {
        setEnergy(3);
        setEmotion(3);
        setNotes("");
        setHabits({
          exercise: false,
          hydration: false,
          sleep: false,
          nutrition: false,
        });
      }
    };
    fetchTodayData();
  }, [date, userId]);

  const toggleHabit = (key: keyof HabitsModel) => {
    setHabits((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  function todayLocalISO() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      userId,
      date,
      physical_energy: energy,
      emotional_state: emotion,
      notes: notes.slice(0, 100),
      habits,
    };

    try {
      await wellnessService.saveLog(payload);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (error: any) {
      if (error.message === "OFFLINE_SAVED") {
        alert(
          "Sin conexión. El registro se guardó en tu dispositivo y se sincronizará pronto.",
        );
        setSuccess(true);
      } else {
        alert(error.message || "Error al guardar. Revisa la conexión.");
      }
    } finally {
      setLoading(false);
    }
  };

  const HabitButton = ({
    active,
    onClick,
    icon: Icon,
    label,
    colorClass,
  }: {
    active: boolean;
    onClick: () => void;
    icon: any;
    label: string;
    colorClass: string;
  }) => (
    <Card
      className={`p-4 transition-all duration-300 border-2 cursor-pointer ${
        active
          ? `${colorClass}/50 bg-${colorClass.split("-")[1]}-500/5`
          : "border-transparent"
      }`}
    >
      <div
        onClick={onClick}
        className="flex flex-col items-center justify-center text-center gap-3 py-2"
      >
        <div
          className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${
            active
              ? `bg-${colorClass.split("-")[1]}-500 text-white`
              : "bg-slate-800 text-slate-400"
          }`}
        >
          <Icon size={24} />
        </div>
        <span
          className={`font-medium ${active ? "text-white" : "text-slate-400"}`}
        >
          {label}
        </span>
      </div>
    </Card>
  );

  if (success) {
    return (
      <div className="h-full flex flex-col items-center justify-center text-center animate-in fade-in zoom-in duration-300 mt-20">
        <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mb-6">
          <CheckCircle2 size={48} className="text-green-500" />
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">¡Guardado!</h2>
        <button
          onClick={() => setSuccess(false)}
          className="mt-8 px-6 py-2 bg-slate-800 text-white rounded-full text-sm"
        >
          Nuevo registro
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 animate-in slide-in-from-bottom-4 duration-500"
    >
      <Card className="p-4 flex items-center justify-between">
        <div className="flex items-center gap-3 text-slate-300">
          <Calendar className="text-rose-400" size={20} />
          <span className="font-medium">Fecha</span>
        </div>
        <input
          type="date"
          required
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="bg-transparent text-right text-white font-medium focus:outline-none focus:ring-1 focus:ring-rose-500 rounded px-2 py-1 [&::-webkit-calendar-picker-indicator]:invert"
        />
      </Card>

      <Card className="p-6 space-y-8">
        <div>
          <div className="flex justify-between items-end mb-4">
            <Label icon={Zap} label="Energía Física" />
            <span className="text-2xl font-bold text-rose-400">{energy}/5</span>
          </div>
          <RatingSelector
            value={energy}
            onChange={setEnergy}
            icon={Zap}
            colorClass="text-rose-500"
          />
        </div>
        <div className="h-px bg-slate-800/50" />
        <div>
          <div className="flex justify-between items-end mb-4">
            <Label icon={Smile} label="Estado Emocional" />
            <span className="text-2xl font-bold text-violet-400">
              {emotion}/5
            </span>
          </div>
          <RatingSelector
            value={emotion}
            onChange={setEmotion}
            type="faces"
            colorClass="text-violet-500"
          />
        </div>
      </Card>

      <div className="grid grid-cols-2 gap-4">
        <HabitButton
          label="Ejercicio"
          active={habits.exercise}
          onClick={() => toggleHabit("exercise")}
          icon={Activity}
          colorClass="border-rose-500"
        />
        <HabitButton
          label="Nutrición"
          active={habits.nutrition}
          onClick={() => toggleHabit("nutrition")}
          icon={Utensils}
          colorClass="border-emerald-500"
        />
        <HabitButton
          label="Sueño"
          active={habits.sleep}
          onClick={() => toggleHabit("sleep")}
          icon={Moon}
          colorClass="border-indigo-500"
        />
        <HabitButton
          label="Hidratación"
          active={habits.hydration}
          onClick={() => toggleHabit("hydration")}
          icon={Droplets}
          colorClass="border-blue-500"
        />
      </div>

      <Card className="p-4 space-y-2">
        <textarea
          placeholder="Notas..."
          maxLength={100}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={3}
          className="w-full bg-transparent text-slate-200 placeholder-slate-600 focus:outline-none resize-none"
        />
        <div className="flex justify-end">
          <span
            className={`text-[10px] font-bold ${notes.length >= 100 ? "text-rose-500" : "text-slate-500"}`}
          >
            {notes.length}/100
          </span>
        </div>
      </Card>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-gradient-to-r from-rose-600 to-violet-600 text-white font-bold py-4 rounded-xl shadow-lg active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-70"
      >
        {loading ? (
          <span className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
        ) : (
          <>
            <Send size={20} /> Guardar
          </>
        )}
      </button>
    </form>
  );
}
