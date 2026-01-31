import type {
  CreateWellnessLogModel,
  WellnessLogModel,
} from "../types/wellness";

const API_URL = import.meta.env.VITE_API_URL;
export const wellnessService = {
  saveLog: async (data: CreateWellnessLogModel): Promise<void> => {
    try {
      const response = await fetch(`${API_URL}/wellness/log`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error al guardar el registro");
      }
    } catch (error) {
      console.error("API Error:", error);
      throw error;
    }
  },

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
};
