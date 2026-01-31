import { Injectable } from "@nestjs/common";
import { WellnessLogModel } from "../domain/models/wellnessLog.model";
import { WellnessRepository } from "../domain/repositories/wellness.repository";
import { CreateWellnessLogDto } from "../domain/dtos/create-log.dto";

@Injectable()
export class LogWellnessUseCase {
  constructor(private readonly wellnessRepository: WellnessRepository) {}

  async run(payload: CreateWellnessLogDto): Promise<void> {
    const logModel: WellnessLogModel = {
      userId: payload.userId,
      date: payload.date,
      physicalEnergy: payload.physical_energy,
      emotionalState: payload.emotional_state,
      notes: payload.notes,
      exercise: payload.habits.exercise,
      hydration: payload.habits.hydration,
      sleep: payload.habits.sleep,
      nutrition: payload.habits.nutrition,
    };

    await this.wellnessRepository.save(logModel);
  }
}
