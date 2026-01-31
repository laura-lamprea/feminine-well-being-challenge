import { LogWellnessUseCase } from "./logWellness.useCase";
import { WellnessRepository } from "../domain/repositories/wellness.repository";

describe("LogWellnessUseCase", () => {
  let useCase: LogWellnessUseCase;
  let wellnessRepository: jest.Mocked<WellnessRepository>;

  beforeEach(() => {
    wellnessRepository = {
      save: jest.fn(),
      findWeeklyStats: jest.fn(),
    } as unknown as jest.Mocked<WellnessRepository>;

    useCase = new LogWellnessUseCase(wellnessRepository);
  });

  it("should map DTO to Model correctly and save it", async () => {
    const payload = {
      userId: "user-123",
      date: "2023-10-10",
      physical_energy: 8,
      emotional_state: 7,
      notes: "test",
      habits: { exercise: true, hydration: true, sleep: true, nutrition: true },
    };

    wellnessRepository.save.mockResolvedValue(undefined);

    await useCase.run(payload);
  });
});
