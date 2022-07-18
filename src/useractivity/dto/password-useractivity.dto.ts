import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateUseractivityDto } from './create-useractivity.dto';
import { IsNotEmpty, Matches, MinLength } from 'class-validator';

export class PasswordUseractivityDto extends PartialType(
  CreateUseractivityDto,
) {
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
