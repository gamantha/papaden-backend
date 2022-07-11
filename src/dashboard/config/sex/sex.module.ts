import { Module } from '@nestjs/common';
import { SexService } from './sex.service';
import { SexController } from './sex.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sex } from './entities/sex.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Sex])],
  controllers: [SexController],
  providers: [SexService],
})
export class SexModule {}
