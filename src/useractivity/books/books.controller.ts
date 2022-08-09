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
  ParseIntPipe, Patch
} from "@nestjs/common";
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { JwtAuthGuard } from '../../auth/strategy/jwt-auth.guard';
import { UpdateBookDto } from "./dto/update-book.dto";

@Controller('/useractivity/books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @UseGuards(JwtAuthGuard)
  @Post('')
  async createBook(@Body() createBookDto: CreateBookDto) {
    return await this.booksService.createBook(createBookDto);
  }

<<<<<<< HEAD
=======
  // Update Book
  @UseGuards(JwtAuthGuard)
  @Patch('update')
  async updBook(
    @Request() req: any,
    @Body() updateBookDto: UpdateBookDto,
  ) {
    return await this.booksService.updBook(updateBookDto);
  }

  @UseGuards(JwtAuthGuard)
>>>>>>> a470d2bda7b3dc3f37325d60c0ac529a3df45743
  @Get('')
  async listsBooks(
    @Query('born_category_title') born_category_title: string,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit = 10,
    @Query('search') search = '',
  ) {
    limit = limit > 100 ? 100 : limit;
    return await this.booksService.listsBooks(
      born_category_title,
      {
        page,
        limit,
        route: 'books',
      },
      search,
    );
  }
}
