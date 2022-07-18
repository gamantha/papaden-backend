import {
  Controller,
  DefaultValuePipe,
  Get,
  Param,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { BooksService } from './books.service';

@Controller('/dashboard/activity/books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Get('')
  async getAdminBookLists(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit = 10,
    @Query('search') search = '',
  ) {
    limit = limit > 100 ? 100 : limit;
    return await this.booksService.getAdminBookLists(
      {
        page,
        limit,
        route: 'books',
      },
      search,
    );
  }

  @Get(':book_id')
  async getAdminBookIds(@Param('book_id') book_id: number) {
    return await this.booksService.getAdminBookIds(book_id);
  }

  @Get('consultan/:consultant_id')
  async getAdminConsultantIds(@Param('consultant_id') consultant_id: string) {
    return await this.booksService.getAdminConsultantIds(consultant_id);
  }
}
