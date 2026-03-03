import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateBoardDto {
  @ApiProperty({ example: 'Project Alpha', description: 'Название доски' })
  @IsString()
  @IsNotEmpty()
  title: string;
}
