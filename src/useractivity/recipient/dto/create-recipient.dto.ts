import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateRecipientDto {
  @ApiProperty({ example: 'e.g. orang tua asuh' })
  @IsNotEmpty()
  rec_cat_title: string;
  @ApiProperty({
    example: 'user id register e.g. 4259a708-cece-4f7d-8335-d85cb0328ece',
  })
  @IsNotEmpty()
  id: string;
  @ApiProperty({ example: 'e.g. mifan twan ardana' })
  @IsNotEmpty()
  regs_fullname: string;
  @ApiProperty({ example: 'e.g. 0000-00-00 00:00:00' })
  @IsNotEmpty()
  regs_borndate: Date;
  @ApiProperty({ example: 'e.g. +62 888 8888 8888' })
  @IsNotEmpty()
  regs_phone: string;
  @ApiProperty({ example: 'e.g. banjarmasin' })
  @IsNotEmpty()
  regs_city: string;
  @ApiProperty({ example: 'e.g. smk' })
  @IsNotEmpty()
  regs_edu: string;
}
