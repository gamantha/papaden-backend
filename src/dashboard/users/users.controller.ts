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
import { UpdateUserDto } from './dto/update-user.dto';

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

  @Get('register/:id')
  async getTempUsersIds(@Param('id') id: number) {
    return await this.usersService.getTempUsersIds(id);
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
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return await this.usersService.updTempUsers(id, updateUserDto);
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
  @Get('member/:id')
  async getPermUsersIds(@Param('id') id: string) {
    console.log("member / id");
    console.log(id);
    return await this.usersService.getPermUsersIds(id);
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
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return await this.usersService.updPermUsers(id, updateUserDto);
  }
}
