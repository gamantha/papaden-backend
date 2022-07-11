import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateRecipientDto {
  @IsNotEmpty()
  @ApiProperty({ example: 'e.g. volunteer' })
  rec_cat_title: string;
}
