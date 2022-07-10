import { PartialType } from '@nestjs/mapped-types';
import { TempsAuthDto } from './temps-auth.dto';
import { IsEmail, IsNotEmpty, Matches, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class VerifyAuthDto extends PartialType(TempsAuthDto) {
  @ApiProperty({ example: 'e.g. account@domain.ext' })
  @IsEmail()
  email: string;
  @ApiProperty({
    example:
      'e.g. 345$dfG, min 8 char. for verification, key password isnt needed',
  })
  @IsNotEmpty()
  @MinLength(8)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password too weak',
  })
  password: string;
}
