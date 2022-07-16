import { Module } from '@nestjs/common';
import { ConsultantService } from './consultant.service';
import { ConsultantController } from './consultant.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Consultant } from './entities/consultant.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Consultant])],
  controllers: [ConsultantController],
  providers: [ConsultantService],
})
export class ConsultantModule {}
