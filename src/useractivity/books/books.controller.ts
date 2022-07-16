import {
  Controller,
  Post,
  Request,
  Body,
  UseGuards,
  Get,
  Param,
  Query,
  DefaultValuePipe,
  ParseIntPipe,
} from '@nestjs/common';
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

  @UseGuards(JwtAuthGuard)
  @Get('')
  async listsBooks(
    @Request() req: any,
    @Param('born_category_title') born_category_title: string,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit = 10,
    @Query('search') search = '',
  ) {
    limit = limit > 100 ? 100 : limit;
    const userData = Object.values(req.user);
    return await this.booksService.listsBooks(
      born_category_title,
      {
        page,
        limit,
        route: 'books',
      },
      userData,
      search,
    );
  }
}
