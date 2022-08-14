import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateConsultantDto } from './create-consultant.dto';
import { IsNotEmpty, IsOptional } from "class-validator";

export class UpdateConsultantDto extends PartialType(CreateConsultantDto) {
  @IsNotEmpty()
  @ApiProperty({ example: 'e.g. Dr. Majin Boo' })
  consultant_fullname: string;
  @IsNotEmpty()
  @ApiProperty({ example: 'e.g. Psikologi' })
  consultant_specialis: string;
  @IsNotEmpty()
  @ApiProperty({ example: 'e.g. Bandung' })
  consultant_city: string;
  @IsNotEmpty()
  @ApiProperty({ example: 'e.g. 7' })
  consultant_exp: string;
  @IsNotEmpty()
  @ApiProperty({ example: 'e.g. +62 888 8888 8888' })
  consultant_phone: string;
  @IsOptional()
  @ApiProperty({ })
  user_id: string;
}
