import { PartialType } from '@nestjs/swagger';
import { CreateSexDto } from './create-sex.dto';

export class UpdateSexDto extends PartialType(CreateSexDto) {}
