import { IsString, IsOptional, MaxLength, IsBoolean } from 'class-validator';

export class updateTaskDto {
  @IsString()
  @IsOptional()
  @MaxLength(100)
  task?: string;

  @IsString()
  @IsOptional()
  @MaxLength(500)
  description?: string;

  @IsBoolean()
  @IsOptional()
  completed?: boolean;
}
