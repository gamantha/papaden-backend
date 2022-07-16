import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { JwtAuthGuard } from '../../auth/strategy/jwt-auth.guard';

@Controller('/useractivity/books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @UseGuards(JwtAuthGuard)
  @Post('')
  async createBook(@Body() createBookDto: CreateBookDto) {
    return await this.booksService.createBook(createBookDto);
  }
}
