import { Body, HttpStatus, Injectable, Patch, Request, UnauthorizedException, UseGuards } from "@nestjs/common";
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { permsAuth, tempsAuth } from './entities/auth.entity';
import { TempsAuthDto } from './dto/temps-auth.dto';
import { VerifyAuthDto } from './dto/verify-auth.dto';
import { Sex } from '../dashboard/config/sex/entities/sex.entity';
import { MailService } from './../mail/mail.service';
import crypto from "crypto";
import { JwtAuthGuard } from "./strategy/jwt-auth.guard";
import { UpdateUseractivityDto } from "../useractivity/dto/update-useractivity.dto";


@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectRepository(tempsAuth)
    private tempsAuthRepository: Repository<tempsAuth>,
    @InjectRepository(permsAuth)
    private permsAuthRepository: Repository<permsAuth>,
    @InjectRepository(Sex)
    private sexRepository: Repository<Sex>,
    private mailService: MailService,
  ) {}
  // Signup
  async create(tempsAuthDto: TempsAuthDto) {
    const { email } = tempsAuthDto;
    // const crypto = require('crypto');

    // const randomString1 = crypto.randomBytes(4).toString('hex');
    // console.log(randomString1);


    const nonVerUsers = await this.tempsAuthRepository.find({
      where: {
        email: email,
      },
    });
    const existingUsers = await this.permsAuthRepository.find({
      where: {
        email: email,
      },
    });

    if (nonVerUsers.length === 1) {
      return {
        statusCode: HttpStatus.OK,
        message: 'anggota sedang dalam review atau menunggu verifikasi',
      };
    } else if (existingUsers.length === 1) {
      return {
        statusCode: HttpStatus.OK,
        message: 'email ini sudah terdaftar',
      };
    } else {
      // tempsAuthDto.reg_token = randomString1;
      const signupTemp = this.tempsAuthRepository.create(tempsAuthDto);
      await this.tempsAuthRepository.save(signupTemp);
      await this.mailService.sendUserConfirmation(signupTemp);
      return {
        statusCode: HttpStatus.OK,
        message: 'pendaftaran telah berhasil',
        data: signupTemp,
      };
    }
  }
  // Login
  async login(verifyAuthDto: VerifyAuthDto) {
    const user = await this.validateUser(verifyAuthDto);
    const payload = {
      userId: user.id,
    };
    return {
      expires_in: 3600,
      access_token: this.jwtService.sign(payload),
      user: user.id,
      val: user.status,
      status: 200,
      profil: user,
    };
  }
  // Validate Email & Password
  async validateUser(verifyAuthDto: VerifyAuthDto) {
    const { email, password } = verifyAuthDto;

    const userTemps = await this.tempsAuthRepository.findOne({
      where: {
        email: email,
      },
    });

    const userPerms = await this.permsAuthRepository.findOne({
      where: {
        email: email,
      },
    });

    let user;
    if (userTemps) {
      user = userTemps;
    } else {
      user = userPerms;
    }

    if (!(await user?.validatePassword(password))) {
      throw new UnauthorizedException();
    }
    if (user.status == 0) {
      throw new UnauthorizedException();
    }
    return user;
  }

  // Sex
  async getSex() {
    const sexVals = await this.sexRepository.find();
    return {
      statusCode: HttpStatus.OK,
      message: 'list gender telah berhasil didapatkan',
      data: sexVals,
    };
  }

  // Sex
  async verify(email: string, token: string) {
    const userTemps = await this.tempsAuthRepository.findOne({
      where: {
        email: email,
      },
    });
    if (userTemps.reg_token == token) {
      await this.tempsAuthRepository.update(userTemps.id, { status: true });
      return {
        statusCode: HttpStatus.OK,
        message: 'VERIFY OK'
      };
    } else {
      return {
        statusCode: HttpStatus.UNAUTHORIZED,
        message: 'Wrong Token'
      };
    }

  }
}
