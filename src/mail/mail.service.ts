import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { permsAuth, tempsAuth } from '../auth/entities/auth.entity';
import { TempsAuthDto } from '../auth/dto/temps-auth.dto';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendUserConfirmation(tempsAuthDto: TempsAuthDto) {
    console.log(tempsAuthDto.reg_token);
    const url = `https://api-devs.papaden.org/auth/verify/${tempsAuthDto.email}/${tempsAuthDto.reg_token}`;
    await this.mailerService.sendMail({
      to: tempsAuthDto.email,
      from: '"Papaden CS" <cs@papaden.org>',
      subject: 'Konfirmasi Registrasi Aplikasi Papaden',
      template: './confirmation',
      context: {
        name: tempsAuthDto.fullname,
        url,
      },
    });
  }
}