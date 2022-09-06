import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Matches, MinLength } from 'class-validator';

export class RatingDto {
  book_id: string;
  rating : number;
}
