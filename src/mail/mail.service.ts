import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { permsAuth, tempsAuth } from '../auth/entities/auth.entity';
import { TempsAuthDto } from '../auth/dto/temps-auth.dto';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendUserConfirmation(tempsAuthDto: TempsAuthDto, token: string) {
    const url = `example.com/auth/confirm?token=${token}`;

    await this.mailerService.sendMail({
      to: tempsAuthDto.email,
      from: '"Support Team" <support@example.com>',
      subject: 'Welcome to Nice App! Confirm your Email',
      template: './confirmation',
      context: {
        name: tempsAuthDto.fullname,
        url,
      },
    });
  }
}