import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateBornDto {
  @IsNotEmpty()
  @ApiProperty({ example: '10' })
  born_start_year: number;
  @IsNotEmpty()
  @ApiProperty({ example: '17' })
  born_end_year: number;
  @IsNotEmpty()
  @ApiProperty({ example: 'e.g. 10-17 Tahun' })
  born_category_title: string;
}
