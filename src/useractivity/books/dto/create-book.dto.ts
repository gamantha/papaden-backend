import { IsNotEmpty, IsOptional } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export class CreateBookDto {
  @IsNotEmpty()
  @ApiProperty({
    example: 'consultan id register .g. 23a1509f-7542-4251-a671-6655f53f3de4',
  })
  consultant_id: string;
  @ApiProperty({ example: 'e.g. Dr. Majin Boo' })
  @IsNotEmpty()
  consultant_fullname: string;
  @ApiProperty({
    example: 'user id register e.g. 4259a708-cece-4f7d-8335-d85cb0328ece',
  })
  @IsNotEmpty()
  id: string;
  @ApiProperty({ example: 'e.g. mifan twan ardana' })
  @IsNotEmpty()
  fullname: string;
  @IsOptional()
  @ApiProperty({
    example: 'e.g. 0000-00-00 00:00:00',
  })
  born_date: Date;
  @ApiProperty({ example: 'e.g. 0000-00-00 00:00:00' })
  @IsNotEmpty()
  book_date: Date;
  @ApiProperty({ example: 'e.g. +62 888 8888 8888' })
  @IsNotEmpty()
  book_phone: string;
  @IsNotEmpty()
  @ApiProperty({
    example:
      'e.g. [{"tags_category_id": 7,"tags_category_title": "depresi"},{"tags_category_id": 8, "tags_category_title": "keuangan"}]',
  })
  book_tags: { tags_category_id: number; tags_category_title: string };
}
