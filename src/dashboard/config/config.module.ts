import { Module } from '@nestjs/common';
import { ConfigService } from './config.service';
import { ConfigController } from './config.controller';
import { TagsModule } from './tags/tags.module';
import { RecipientModule } from './recipient/recipient.module';
import { SexModule } from './sex/sex.module';
import { BornModule } from './born/born.module';

@Module({
  controllers: [ConfigController],
  providers: [ConfigService],
  imports: [TagsModule, RecipientModule, SexModule, BornModule]
})
export class ConfigModule {}
