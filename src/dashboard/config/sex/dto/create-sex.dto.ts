import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateSexDto {
  @IsNotEmpty()
  @ApiProperty({ example: 'e.g. laki-laki' })
  sex_category_title: string;
}
