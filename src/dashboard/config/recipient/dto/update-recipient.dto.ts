import { PartialType } from '@nestjs/swagger';
import { CreateRecipientCatsDto } from './create-recipient.dto';

export class UpdateRecipientDto extends PartialType(CreateRecipientCatsDto) {}
