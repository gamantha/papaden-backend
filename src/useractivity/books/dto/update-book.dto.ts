import { ApiProperty, PartialType } from "@nestjs/swagger";
import { CreateBookDto } from './create-book.dto';
import { Column } from "typeorm";
import { IsEmail, IsNotEmpty, IsOptional, IsPhoneNumber } from "class-validator";

export class UpdateBookDto extends PartialType(CreateBookDto) {

  @ApiProperty({
    example: 'e.g account@domain.ext',
  })
  @IsNotEmpty()
  book_id: number;
  @IsOptional()
  status: string;
}
