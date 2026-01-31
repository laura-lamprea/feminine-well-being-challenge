export interface CreateWellnessLogModel {
  userId: string;
  date: string;
  physical_energy: number;
  emotional_state: number;
  notes: string;
  habits: HabitsModel;
}

export interface WellnessLogModel {
  id?: string;
  userId: string;
  date: string;
  physicalEnergy: number;
  emotionalState: number;
  notes: string;
  exercise: boolean;
  hydration: number;
  sleep: number;
  nutrition: number;
}

export interface HabitsModel {
  exercise: boolean;
  hydration: boolean;
  sleep: boolean;
  nutrition: boolean;
}
