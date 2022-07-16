import { Module } from '@nestjs/common';
import { BooksService } from './books.service';
import { BooksController } from './books.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from './entities/book.entity';
import { Born } from '../../dashboard/config/born/entities/born.entity';
import { permsAuth } from '../../auth/entities/auth.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Book, Born, permsAuth])],
  controllers: [BooksController],
  providers: [BooksService],
})
export class BooksModule {}
