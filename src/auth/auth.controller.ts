import { Controller, Post, Body, HttpStatus, Get, Param } from "@nestjs/common";
import { AuthService } from './auth.service';
import { TempsAuthDto } from './dto/temps-auth.dto';
import { VerifyAuthDto } from './dto/verify-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async create(@Body() tempsAuthDto: TempsAuthDto) {
    return await this.authService.create(tempsAuthDto);
  }

  @Post('login')
  async login(@Body() verifyAuthDto: VerifyAuthDto) {
    const tokenVals = await this.authService.login(verifyAuthDto);
    return {
      statusCode: HttpStatus.OK,
      message: 'User Login successfully',
      tokenVals,
    };
  }

  @Get('sexcats')
  async getSex() {
    return await this.authService.getSex();
  }

  @Get('verify/:email/:token')
  async verify(@Param('token') token: string, @Param('email') email: string) {
    return await this.authService.verify(email, token);
  }

}
