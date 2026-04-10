import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsInt, IsOptional, IsString } from 'class-validator';
import { TaskStatus } from './create-task.dto';

export class UpdateTaskDto {
  @ApiPropertyOptional({ example: 'Updated title', description: 'Название задачи' })
  @IsString()
  @IsOptional()
  title?: string;

  @ApiPropertyOptional({ example: 'Updated description', description: 'Описание задачи' })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiPropertyOptional({ enum: TaskStatus, example: 'in_progress', description: 'Статус задачи' })
  @IsEnum(TaskStatus)
  @IsOptional()
  status?: TaskStatus;

  @ApiPropertyOptional({ example: 1, description: 'ID доски' })
  @IsInt()
  @IsOptional()
  boardId?: number;
}
