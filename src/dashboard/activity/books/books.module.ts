import { Module } from '@nestjs/common';
import { BooksService } from './books.service';
import { BooksController } from './books.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from './entities/book.entity';
import { Consultant } from '../../consultant/entities/consultant.entity';
import { MailModule } from '../../../mail/mail.module';

@Module({
  imports: [TypeOrmModule.forFeature([Book, Consultant]),
    MailModule,
  ],
  controllers: [BooksController],
  providers: [BooksService],

})
export class BooksModule {}
