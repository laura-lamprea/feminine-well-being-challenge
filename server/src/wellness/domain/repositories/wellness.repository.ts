import { WellnessLogModel } from "../models/wellnessLog.model";

export abstract class WellnessRepository {
  abstract save(log: WellnessLogModel): Promise<void>;
  abstract findWeeklyStats(
    userId: string,
    date: string,
  ): Promise<WellnessLogModel[]>;
}
