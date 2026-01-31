import { Injectable } from "@nestjs/common";
import { WellnessLogModel } from "../domain/models/wellnessLog.model";
import { WellnessRepository } from "../domain/repositories/wellness.repository";

@Injectable()
export class GetWeeklyStatsUseCase {
  constructor(private readonly wellnessRepository: WellnessRepository) {}

  async run(userId: string, date: string): Promise<WellnessLogModel[]> {
    const weeklyLogs = await this.wellnessRepository.findWeeklyStats(
      userId,
      date,
    );

    return weeklyLogs;
  }
}
