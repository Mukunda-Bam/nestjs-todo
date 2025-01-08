import {
  IsString,
  IsNotEmpty,
  IsOptional,
  MaxLength,
  IsBoolean,
} from 'class-validator';

export class createTaskDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @MaxLength(100)
  task: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @MaxLength(500)
  description?: string;

  @IsBoolean()
  @IsOptional()
  completed: boolean = false;
}
