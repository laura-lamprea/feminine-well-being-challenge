import { Controller, Post, Body, Get, Query, HttpStatus } from "@nestjs/common";
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from "@nestjs/swagger";
import { GetWeeklyStatsUseCase } from "src/wellness/application/getWeeklyStats.useCase";
import { LogWellnessUseCase } from "src/wellness/application/logWellness.useCase";
import { CreateWellnessLogDto } from "src/wellness/domain/dtos/create-log.dto";

@ApiTags("Wellness")
@Controller("wellness")
export class WellnessController {
  constructor(
    private readonly logWellnessUseCase: LogWellnessUseCase,
    private readonly getWeeklyStatsUseCase: GetWeeklyStatsUseCase,
  ) {}

  @Post("log")
  @ApiOperation({ summary: "Register a new wellness log" })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: "The wellness log has been successfully created/updated.",
  })
  async log(@Body() dto: CreateWellnessLogDto) {
    return this.logWellnessUseCase.run(dto);
  }

  @Get("stats")
  @ApiOperation({ summary: "Get statistics for the last 7 days" })
  @ApiQuery({
    name: "date",
    required: false,
    description: "Reference date (YYYY-MM-DD)",
  })
  async stats(@Query("userId") userId: string, @Query("date") date?: string) {
    return this.getWeeklyStatsUseCase.run(
      userId,
      date ?? new Date().toISOString().substring(0, 10),
    );
  }
}
