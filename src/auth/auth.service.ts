import { HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { permsAuth, tempsAuth } from './entities/auth.entity';
import { TempsAuthDto } from './dto/temps-auth.dto';
import { VerifyAuthDto } from './dto/verify-auth.dto';
import { Sex } from '../dashboard/config/sex/entities/sex.entity';

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
  ) {}
  // Signup
  async create(tempsAuthDto: TempsAuthDto) {
    const { email } = tempsAuthDto;
    const nonVerUsers = await this.tempsAuthRepository.find({
      where: {
        email: email,
      },
    });
    if (nonVerUsers.length === 1) {
      return {
        statusCode: HttpStatus.OK,
        message: 'anggota sedang dalam review atau menunggu verifikasi',
      };
    } else {
      const signupTemp = this.tempsAuthRepository.create(tempsAuthDto);
      await this.tempsAuthRepository.save(signupTemp);
      return {
        statusCode: HttpStatus.OK,
        message: 'pendaftaran telah berhasil, silakan tunggu verifikasi',
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
      status: 200,
    };
  }
  // Validate Email & Password
  async validateUser(verifyAuthDto: VerifyAuthDto): Promise<permsAuth> {
    const { email, password } = verifyAuthDto;
    const user = await this.permsAuthRepository.findOne({
      where: {
        email: email,
      },
    });
    if (!(await user?.validatePassword(password))) {
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
}
