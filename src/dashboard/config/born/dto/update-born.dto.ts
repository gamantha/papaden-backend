import { PartialType } from '@nestjs/swagger';
import { CreateBornDto } from './create-born.dto';

export class UpdateBornDto extends PartialType(CreateBornDto) {}
