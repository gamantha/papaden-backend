import { Module } from '@nestjs/common';
import { BooksService } from './books.service';
import { BooksController } from './books.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from './entities/book.entity';
import { Born } from '../../dashboard/config/born/entities/born.entity';
import { permsAuth } from '../../auth/entities/auth.entity';
import { Consultant } from "../../dashboard/consultant/entities/consultant.entity";
import {MailModule} from "../../mail/mail.module";

@Module({
  imports: [TypeOrmModule.forFeature([Book, Born, permsAuth, Consultant]),
    MailModule],
  controllers: [BooksController],
  providers: [BooksService],
})
export class BooksModule {}
