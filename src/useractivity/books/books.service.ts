import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from './entities/book.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book)
    private bookRepository: Repository<Book>,
  ) {}

  async createBook(createBookDto: CreateBookDto) {
    const postBooks = await this.bookRepository.create(createBookDto);
    await this.bookRepository.save(postBooks);
    return {
      statusCode: HttpStatus.OK,
      message: 'permintaan teman bicara telah sukses terkirim',
      data: postBooks,
    };
  }
}
