import { HttpStatus, Injectable } from '@nestjs/common';
import { TempsAuthDto } from './dto/temps-auth.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { tempsAuth } from './entities/auth.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(tempsAuth)
    private tempsAuthRepository: Repository<tempsAuth>,
  ) {}
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
        message: 'User Is Being Reviewed or Verification',
      };
    } else {
      const signupTemp = this.tempsAuthRepository.create(tempsAuthDto);
      await this.tempsAuthRepository.save(tempsAuthDto);
      return {
        statusCode: HttpStatus.OK,
        message:
          'registration has been successful, please wait for the verification',
        data: signupTemp,
      };
    }
  }
}
