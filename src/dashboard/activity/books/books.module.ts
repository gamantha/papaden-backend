import { Module } from '@nestjs/common';
import { BooksService } from './books.service';
import { BooksController } from './books.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from './entities/book.entity';
import { Consultant } from '../../consultant/entities/consultant.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Book, Consultant])],
  controllers: [BooksController],
  providers: [BooksService],
})
export class BooksModule {}
