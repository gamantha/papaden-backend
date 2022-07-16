import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateUseractivityDto } from './create-useractivity.dto';
import { IsNotEmpty } from 'class-validator';

export class ProfilUseractivityDto extends PartialType(CreateUseractivityDto) {
  @ApiProperty({
    example: 'user id register e.g. 4259a708-cece-4f7d-8335-d85cb0328ece',
  })
  id: string;
  @ApiProperty({ example: 'e.g.' })
  @IsNotEmpty()
  profil_filename: string;
  @ApiProperty({ example: 'e.g.' })
  @IsNotEmpty()
  profil_path: string;
  @ApiProperty({ example: 'e.g.' })
  @IsNotEmpty()
  profil_mimetype: string;
}
