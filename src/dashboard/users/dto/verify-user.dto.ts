import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';

export class VerifyUserDto {
  @ApiProperty({ example: 'e.g. account@domain.ext' })
  @IsEmail()
  email: string;
}
