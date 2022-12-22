import { Module } from '@nestjs/common';
import { DeleterequestService } from './deleterequest.service';
import { DeleterequestController } from './deleterequest.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { permsAuth } from "../auth/entities/auth.entity";
import { MailModule } from "../mail/mail.module";
import { Deleterequest } from "./entities/deleterequest.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Deleterequest,permsAuth]),
    MailModule],
  controllers: [DeleterequestController],
  providers: [DeleterequestService]
})
export class DeleterequestModule {}
