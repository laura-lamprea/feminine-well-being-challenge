export class WellnessLogModel {
  userId: string;
  date: string;
  physicalEnergy: number;
  emotionalState: number;
  notes?: string;
  exercise: boolean;
  hydration: boolean;
  sleep: boolean;
  nutrition: boolean;
}
