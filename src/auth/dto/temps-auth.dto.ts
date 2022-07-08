import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsEmpty,
  IsNotEmpty,
  IsPhoneNumber,
  Matches,
  MinLength,
} from 'class-validator';
export class TempsAuthDto {
  @ApiProperty({
    example: 'e.g. mifan twan ardana',
  })
  @IsNotEmpty()
  fullname: string;
  @IsEmpty()
  @ApiProperty({
    example: 'e.g. banjarmasin',
  })
  born_city: string;
  @IsEmpty()
  @ApiProperty({
    example: 'e.g. 0000-00-00 00:00:00',
  })
  born_date: Date;
  @IsEmpty()
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
  @ApiProperty({
    example: 'e.g. 123@!abC,  min 8 char',
  })
  @IsNotEmpty()
  @MinLength(8)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password too weak',
  })
  password: string;
}
