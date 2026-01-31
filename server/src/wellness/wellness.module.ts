import { Module } from "@nestjs/common";
import { WellnessController } from "./infrastructure/controllers/wellness.controller";
import { LogWellnessUseCase } from "./application/logWellness.useCase";
import { GetWeeklyStatsUseCase } from "./application/getWeeklyStats.useCase";
import { WellnessRepository } from "./domain/repositories/wellness.repository";
import { PrismaWellnessRepository } from "./infrastructure/persistence/prisma-wellness.repository";
import { PrismaModule } from "src/prisma/prisma.module";

@Module({
  imports: [PrismaModule],
  controllers: [WellnessController],
  providers: [
    LogWellnessUseCase,
    GetWeeklyStatsUseCase,
    {
      provide: WellnessRepository,
      useClass: PrismaWellnessRepository,
    },
  ],
})
export class WellnessModule {}
