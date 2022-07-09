import { Controller, Get } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('dashboard/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Get()
  findAll() {
    return this.usersService.findAll();
  }
}
