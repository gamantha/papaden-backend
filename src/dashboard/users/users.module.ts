import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { permsAuth, tempsAuth } from '../../auth/entities/auth.entity';

@Module({
  imports: [TypeOrmModule.forFeature([tempsAuth, permsAuth])],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
