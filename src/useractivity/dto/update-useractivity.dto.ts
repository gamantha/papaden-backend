import { PartialType } from '@nestjs/swagger';
import { CreateUseractivityDto } from './create-useractivity.dto';

export class UpdateUseractivityDto extends PartialType(CreateUseractivityDto) {}
