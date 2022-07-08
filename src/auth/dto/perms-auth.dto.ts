import { PartialType } from '@nestjs/swagger';
import { TempsAuthDto } from './temps-auth.dto';

export class PermsAuthDto extends PartialType(TempsAuthDto) {}
