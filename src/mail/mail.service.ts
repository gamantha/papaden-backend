import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { permsAuth, tempsAuth } from '../auth/entities/auth.entity';
import { TempsAuthDto } from '../auth/dto/temps-auth.dto';
import { CreateDeleterequestDto } from '../deleterequest/dto/create-deleterequest.dto';
import { UpdateDeleterequestDto } from "../deleterequest/dto/update-deleterequest.dto";

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}
  async deleteRequestConfirmation(
    createDeleterequestDto: CreateDeleterequestDto,
  ) {
    // console.log(createDeleterequestDto.reg_token);
    const url = `https://api-devs.papaden.org/deleterequest/confirm?email=${createDeleterequestDto.email}&token=${createDeleterequestDto.reg_token}`;
    // console.log(url);
    await this.mailerService.sendMail({
      to: createDeleterequestDto.email,
      from: '"Papaden CS" <cs@papaden.org>',
      subject: 'Konfirmasi penghapusan Akun Aplikasi Papaden',
      template: './deleteconfirmation',
      context: {
        name: createDeleterequestDto.email,
        url,
      },
    });
  }

  async deleteRequestResendConfirmation(
    updateDeleterequestDto: UpdateDeleterequestDto,
  ) {
    const url = `https://api-devs.papaden.org/deleterequest/confirm?email=${updateDeleterequestDto.email}&token=${updateDeleterequestDto.reg_token}`;
    await this.mailerService.sendMail({
      to: updateDeleterequestDto.email,
      from: '"Papaden CS" <cs@papaden.org>',
      subject: 'Konfirmasi penghapusan Akun Aplikasi Papaden',
      template: './deleteconfirmation',
      context: {
        name: updateDeleterequestDto.email,
        url,
      },
    });
  }



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

  async sendResetPassword(permAuth: permsAuth, resetpasswordtoken: string) {
    console.log(permAuth.status);
    const url = `https://papaden.org/resetpassword?email=${permAuth.email}&resetpasswordtoken=${resetpasswordtoken}`;
    await this.mailerService.sendMail({
      to: permAuth.email,
      from: '"Papaden CS" <cs@papaden.org>',
      subject: 'Konfirmasi Reset Password Aplikasi Papaden',
      template: './confirmation',
      context: {
        name: permAuth.fullname,
        url,
      },
    });
  }





  // async sendBookingNotification(permUser: permsAuth, msg : string) {
  //   await this.mailerService.sendMail({
  //     to: permUser.email,
  //     from: '"Papaden CS" <cs@papaden.org>',
  //     subject: 'Booking Notification',
  //     template: './booking_notification',
  //     context: {
  //       name: permUser.fullname,
  //       msg : msg
  //     },
  //   });
  //
  //
  //   await this.mailerService.sendMail({
  //     to: '"Papaden CS" <cs@papaden.org>',
  //     from: '"Papaden CS" <cs@papaden.org>',
  //     subject: 'Booking notification',
  //     template: './booking_notification',
  //     context: {
  //       name: permUser.fullname,
  //       msg : msg
  //     },
  //   });
  //
  //
  // }

  async sendRequestNotification(permUser: permsAuth, msg : string) {
    await this.mailerService.sendMail({
      to: permUser.email,
      from: '"Papaden CS" <cs@papaden.org>',
      subject: 'Request verification',
      template: './request_verification',
      context: {
        name: permUser.fullname,
        msg : msg
      },
    });


    await this.mailerService.sendMail({
      to: '"Papaden CS" <cs@papaden.org>',
      from: '"Papaden CS" <cs@papaden.org>',
      subject: 'Request verification',
      template: './request_verification',
      context: {
        name: permUser.fullname,
        msg : msg
      },
    });


  }


  async sendVerifyNotification(permUser: permsAuth) {
    await this.mailerService.sendMail({
      to: permUser.email,
      from: '"Papaden CS" <cs@papaden.org>',
      subject: 'Request verification',
      template: './request',
      context: {
        name: permUser.fullname,
      },
    });


    await this.mailerService.sendMail({
      to: '"Papaden CS" <cs@papaden.org>',
      from: '"Papaden CS" <cs@papaden.org>',
      subject: 'Request verification',
      template: './request_2',
      context: {
        name: permUser.fullname,
      },
    });


  }


}
