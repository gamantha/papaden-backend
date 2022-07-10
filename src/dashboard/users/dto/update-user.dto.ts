import { PartialType } from '@nestjs/swagger';
import { VerifyUserDto } from './verify-user.dto';

export class UpdateUserDto extends PartialType(VerifyUserDto) {}
