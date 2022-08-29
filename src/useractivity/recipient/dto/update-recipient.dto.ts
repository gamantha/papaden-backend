import { ApiProperty, PartialType } from "@nestjs/swagger";
import { CreateRecipientDto } from './create-recipient.dto';
import { IsNotEmpty, IsOptional } from "class-validator";

export class UpdateRecipientDto extends PartialType(CreateRecipientDto) {

  @ApiProperty({
    example: 'e.g account@domain.ext',
  })
  @IsNotEmpty()
  regs_id: number;
  @IsOptional()
  status: string;
  @IsOptional()
  regs_volunteer: string;
}
