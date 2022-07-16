import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTagDto {
  @IsNotEmpty()
  @ApiProperty({ example: 'e.g. Pendidikan' })
  tags_category_title: string;
}
