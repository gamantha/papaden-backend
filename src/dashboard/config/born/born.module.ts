import { Module } from '@nestjs/common';
import { BornService } from './born.service';
import { BornController } from './born.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Born } from './entities/born.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Born])],
  controllers: [BornController],
  providers: [BornService],
})
export class BornModule {}
