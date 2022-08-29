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
import { UpdateUseractivityDto } from "../dto/update-useractivity.dto";

@Controller('/useractivity/books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @UseGuards(JwtAuthGuard)
  @Post('')
  async createBook(@Request() req: any,@Body() createBookDto: CreateBookDto) {
    console.log("Create book");
    console.log(createBookDto.book_date);
    return await this.booksService.createBook(createBookDto, req);
  }

  // Update Book
  @UseGuards(JwtAuthGuard)
  @Patch('update')
  async updBook(
    @Request() req: any,
    @Body() updateBookDto: UpdateBookDto,
  ) {
    return await this.booksService.updBook(updateBookDto, req);
  }

  // Update Book status
  @UseGuards(JwtAuthGuard)
  @Patch('updatestatus')
  async updBookStatus(
    @Request() req: any,
    @Body() updateBookDto: UpdateBookDto,
  ) {
    return await this.booksService.updBookStatus(updateBookDto, req);
  }



  @UseGuards(JwtAuthGuard)
  @Get('')
  async listsBooks(
    @Request() req: any,
    @Query('born_category_title') born_category_title: string,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit = 10,
    @Query('search') search = '',
  ) {
    limit = limit > 100 ? 100 : limit;
    const userData = Object.values(req.user)
    return await this.booksService.listsBooks(
      userData,
      born_category_title,
      {
        page,
        limit,
        route: 'books',
      },
      search,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get('user-info')
  getUserInfo(
  @Request() req: any,
  // @Body() updateUseractivityDto: UpdateUseractivityDto,
  ) {
    console.log(req)
    return req.user
  }
}
