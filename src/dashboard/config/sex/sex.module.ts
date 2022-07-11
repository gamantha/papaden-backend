import { Module } from '@nestjs/common';
import { SexService } from './sex.service';
import { SexController } from './sex.controller';

@Module({
  controllers: [SexController],
  providers: [SexService]
})
export class SexModule {}
