import { Injectable } from "@nestjs/common";
import { WellnessRepository } from "src/wellness/domain/repositories/wellness.repository";
import { WellnessLogModel } from "src/wellness/domain/models/wellnessLog.model";
import { PrismaService } from "src/prisma/prisma.service";
import { IntegralWellbeing } from "@prisma/client";

@Injectable()
export class PrismaWellnessRepository implements WellnessRepository {
  constructor(private readonly prisma: PrismaService) {}

  private mapToModel(data: IntegralWellbeing): WellnessLogModel {
    return {
      userId: data.userId,
      date: data.date,
      physicalEnergy: data.physicalEnergy,
      emotionalState: data.emotionalState,
      notes: data.notes ?? "",
      exercise: data.exercise,
      hydration: data.hydration,
      sleep: data.sleep,
      nutrition: data.nutrition,
    };
  }

  async save(log: WellnessLogModel): Promise<void> {
    await this.prisma.integralWellbeing.upsert({
      where: {
        userId_date: {
          userId: log.userId,
          date: log.date,
        },
      },
      update: {
        physicalEnergy: log.physicalEnergy,
        emotionalState: log.emotionalState,
        notes: log.notes,
        exercise: log.exercise,
        hydration: log.hydration,
        sleep: log.sleep,
        nutrition: log.nutrition,
      },
      create: {
        userId: log.userId,
        date: log.date,
        physicalEnergy: log.physicalEnergy,
        emotionalState: log.emotionalState,
        notes: log.notes,
        exercise: log.exercise,
        hydration: log.hydration,
        sleep: log.sleep,
        nutrition: log.nutrition,
      },
    });
  }

  async findWeeklyStats(
    userId: string,
    date: string,
  ): Promise<WellnessLogModel[]> {
    const [year, month, day] = date.split("-").map(Number);

    const endDate = new Date(year, month - 1, day);
    const startDate = new Date(endDate);
    startDate.setDate(startDate.getDate() - 6);

    const start = startDate.toISOString().substring(0, 10);
    const end = date;

    const records = await this.prisma.integralWellbeing.findMany({
      where: {
        userId,
        date: {
          gte: start,
          lte: end,
        },
      },
      orderBy: { date: "asc" },
      take: 7,
    });

    return records.map((r) => this.mapToModel(r));
  }
}
