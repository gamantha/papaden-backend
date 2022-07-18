import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateRecipientCatsDto {
  @IsNotEmpty()
  @ApiProperty({ example: 'e.g. orang tua asuh' })
  rec_cat_title: string;
}
