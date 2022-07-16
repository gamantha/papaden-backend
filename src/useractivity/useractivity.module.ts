import { Module } from '@nestjs/common';
import { UseractivityService } from './useractivity.service';
import { UseractivityController } from './useractivity.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { permsAuth, tempsAuth } from '../auth/entities/auth.entity';
import { Born } from '../dashboard/config/born/entities/born.entity';
import { Tag } from '../dashboard/config/tags/entities/tag.entity';
import { Recipient } from '../dashboard/config/recipient/entities/recipient.entity';
import { Consultant } from '../dashboard/consultant/entities/consultant.entity';
import { BooksModule } from './books/books.module';
import { RecipientModule } from './recipient/recipient.module';
import { LocalService } from './local/local.service';
import { profilImage } from './entities/useractivity.entity';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      tempsAuth,
      permsAuth,
      Born,
      Tag,
      Recipient,
      Consultant,
      profilImage,
    ]),
    ConfigModule,
    BooksModule,
    RecipientModule,
  ],
  controllers: [UseractivityController],
  providers: [UseractivityService, LocalService],
})
export class UseractivityModule {}
