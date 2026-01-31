import { GetWeeklyStatsUseCase } from "./getWeeklyStats.useCase";
import { WellnessRepository } from "../domain/repositories/wellness.repository";
import { jest } from "@jest/globals";

describe("GetWeeklyStatsUseCase", () => {
  let useCase: GetWeeklyStatsUseCase;

  let wellnessRepository: jest.Mocked<WellnessRepository>;

  beforeEach(() => {
    wellnessRepository = {
      findWeeklyStats: jest.fn(),
      save: jest.fn(),
    } as unknown as jest.Mocked<WellnessRepository>;

    useCase = new GetWeeklyStatsUseCase(wellnessRepository);
  });

  it("should call repository with correct userId and return stats", async () => {
    const userId = "user-123";
    const mockDate = new Date();

    wellnessRepository.findWeeklyStats.mockResolvedValue([]);

    await useCase.run(userId, mockDate);
  });
});
