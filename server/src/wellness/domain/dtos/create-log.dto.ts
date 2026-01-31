import {
  IsBoolean,
  IsDateString,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
  ValidateNested,
} from "class-validator";
import { Type } from "class-transformer";
import { ApiProperty } from "@nestjs/swagger";

class HabitsDto {
  @ApiProperty() @IsBoolean() exercise: boolean;
  @ApiProperty() @IsBoolean() hydration: boolean;
  @ApiProperty() @IsBoolean() sleep: boolean;
  @ApiProperty() @IsBoolean() nutrition: boolean;
}

export class CreateWellnessLogDto {
  @ApiProperty({ example: "test_user_123" })
  @IsString()
  @IsNotEmpty()
  userId: string;

  @ApiProperty({ example: "2024-03-15" })
  @IsDateString()
  date: string;

  @ApiProperty({ minimum: 1, maximum: 5 })
  @IsInt()
  @Min(1)
  @Max(5)
  physical_energy: number;

  @ApiProperty({ minimum: 1, maximum: 5 })
  @IsInt()
  @Min(1)
  @Max(5)
  emotional_state: number;

  @ApiProperty({ required: false, maxLength: 100 })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  notes?: string;

  @ApiProperty()
  @ValidateNested()
  @Type(() => HabitsDto)
  habits: HabitsDto;
}
