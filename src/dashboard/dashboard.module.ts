import { Module } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { DashboardController } from './dashboard.controller';
import { UsersModule } from './users/users.module';
import { ConfigModule } from './config/config.module';

@Module({
  controllers: [DashboardController],
  providers: [DashboardService],
  imports: [UsersModule, ConfigModule]
})
export class DashboardModule {}
