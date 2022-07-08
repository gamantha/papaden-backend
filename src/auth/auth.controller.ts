import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { TempsAuthDto } from './dto/temps-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  create(@Body() tempsAuthDto: TempsAuthDto) {
    return this.authService.create(tempsAuthDto);
  }
}
