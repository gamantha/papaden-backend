import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateUseractivityDto } from './create-useractivity.dto';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
} from 'class-validator';
import { Column } from "typeorm";

export class UpdateUseractivityDto extends PartialType(CreateUseractivityDto) {
  @ApiProperty({
    example: 'e.g. mifan twan ardana',
  })
  @IsNotEmpty()
  fullname: string;
  @IsOptional()
  @ApiProperty({
    example: 'e.g. banjarmasin',
  })
  born_city: string;
  @IsOptional()
  @ApiProperty({
    example: 'e.g. 0000-00-00 00:00:00',
  })
  born_date: Date;
  @IsOptional()
  @ApiProperty({ enum: ['laki-laki', 'perempuan'] })
  sex_category_title: string;
  @IsPhoneNumber()
  @ApiProperty({
    example: 'e.g +62 888 8888 8888',
  })
  phone: string;
  @ApiProperty({
    example: 'e.g account@domain.ext',
  })
  @IsEmail()
  email: string;
  @IsOptional()
  isvolunteer: string;
}
