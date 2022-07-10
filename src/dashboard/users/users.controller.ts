import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { TempsAuthDto } from '../../auth/dto/temps-auth.dto';

@Controller('dashboard/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  // Get & Searh Register
  @Get('register')
  async getTempUsers(
    @Query('search') search = '',
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit = 10,
  ) {
    limit = limit > 100 ? 100 : limit;
    return await this.usersService.getTempUsers(
      {
        page,
        limit,
        route: 'register',
      },
      search,
    );
  }
  // Post Register
  @Post('register')
  async postTempUsers(@Body() tempsAuthDto: TempsAuthDto) {
    return await this.usersService.postTempUsers(tempsAuthDto);
  }
  // Delete Register
  @Delete('register/:id')
  async delTempUsers(@Param('id') id: number) {
    return await this.usersService.delTempUsers(id);
  }
  // Update Register
  @Patch('register/:id')
  async updTempUsers(
    @Param('id') id: number,
    @Body() tempsAuthDto: TempsAuthDto,
  ) {
    return await this.usersService.updTempUsers(id, tempsAuthDto);
  }
  // Validate
  @Post('register/vals')
  async valsTempUsers(@Body() vals: any) {
    return await this.usersService.valTempUsers(vals);
  }
  // Get & Searh Users
  @Get('member')
  async getPermUsers(
    @Query('search') search = '',
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit = 10,
  ) {
    limit = limit > 100 ? 100 : limit;
    return await this.usersService.getPermUsers(
      {
        page,
        limit,
        route: 'member',
      },
      search,
    );
  }
  // Delete Member
  @Delete('member/:id')
  async delPermUsers(@Param('id') id: string) {
    return await this.usersService.delPermUsers(id);
  }
  // Update Member
  @Patch('member/:id')
  async updPermUsers(
    @Param('id') id: string,
    @Body() tempsAuthDto: TempsAuthDto,
  ) {
    return await this.usersService.updPermUsers(id, tempsAuthDto);
  }
}
