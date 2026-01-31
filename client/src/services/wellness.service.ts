import type {
  CreateWellnessLogModel,
  WellnessLogModel,
} from "../types/wellness";

const API_URL = import.meta.env.VITE_API_URL;
const QUEUE_KEY = "f2fit_pending_sync";

export const wellnessService = {
  getWeeklyStats: async (
    userId: string,
    targetDate?: string,
  ): Promise<WellnessLogModel[]> => {
    try {
      const dateParam = targetDate || new Date().toISOString().split("T")[0];
      const url = `${API_URL}/wellness/stats?userId=${userId}&date=${dateParam}`;

      const response = await fetch(url);
      if (!response.ok) throw new Error("Error en la petición");

      const data = await response.json();
      return data.map((item: any) => ({
        ...item,
        date: item.date,
      }));
    } catch (error) {
      console.error("Wellness Service Error:", error);
      return [];
    }
  },

  saveLog: async (data: any) => {
    if (!navigator.onLine) {
      const queue = JSON.parse(localStorage.getItem(QUEUE_KEY) || "[]");
      const updatedQueue = [
        ...queue.filter((q: any) => q.date !== data.date),
        data,
      ];
      localStorage.setItem(QUEUE_KEY, JSON.stringify(updatedQueue));
      throw new Error("OFFLINE_SAVED");
    }

    const response = await fetch(`${API_URL}/wellness/log`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || "Error en el servidor");
    }

    if (
      response.status !== 204 &&
      response.headers.get("content-type")?.includes("application/json")
    ) {
      await response.json();
    }
  },

  sync: async function () {
    const queue = JSON.parse(localStorage.getItem(QUEUE_KEY) || "[]");
    if (queue.length === 0) return;
    for (const log of queue) {
      try {
        await this.saveLog(log);
      } catch (e) {
        break;
      }
    }
    localStorage.removeItem(QUEUE_KEY);
  },
};

window.addEventListener("online", () => wellnessService.sync());
