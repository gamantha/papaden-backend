import { Module } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { DashboardController } from './dashboard.controller';
import { UsersModule } from './users/users.module';
import { ConfigModule } from './config/config.module';
import { ConsultantModule } from './consultant/consultant.module';
import { BooksModule } from './activity/books/books.module';
import { RecipientModule } from './activity/recipient/recipient.module';

@Module({
  controllers: [DashboardController],
  providers: [DashboardService],
  imports: [UsersModule, ConfigModule, ConsultantModule, BooksModule, RecipientModule]
})
export class DashboardModule {}
