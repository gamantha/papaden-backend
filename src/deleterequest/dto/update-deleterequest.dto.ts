import { ApiProperty, PartialType } from "@nestjs/swagger";
import { CreateDeleterequestDto } from './create-deleterequest.dto';
import { IsNotEmpty } from "class-validator";

export class UpdateDeleterequestDto extends PartialType(
  CreateDeleterequestDto,
) {
  @ApiProperty({ example: 'e.g. requested, deleted' })
  @IsNotEmpty()
  status: string;
}
