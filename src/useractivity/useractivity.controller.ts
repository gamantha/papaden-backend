import {
  Controller,
  Get,
  UseGuards,
  Request,
  Query,
  DefaultValuePipe,
  ParseIntPipe,
} from '@nestjs/common';
import { UseractivityService } from './useractivity.service';
import { JwtAuthGuard } from '../auth/strategy/jwt-auth.guard';

@Controller('useractivity')
export class UseractivityController {
  constructor(private readonly useractivityService: UseractivityService) {}

  @UseGuards(JwtAuthGuard)
  @Get('profil')
  async getProfil(@Request() req: any) {
    const vals = Object.values(req.user);
    return await this.useractivityService.findProfil(vals);
  }

  @UseGuards(JwtAuthGuard)
  @Get('born')
  async findBorn() {
    return await this.useractivityService.findBorn();
  }

  @UseGuards(JwtAuthGuard)
  @Get('tags')
  async findTag() {
    return await this.useractivityService.findTag();
  }
  // Get Recipient
  @UseGuards(JwtAuthGuard)
  @Get('recipientcats')
  async findRecipient() {
    return await this.useractivityService.findRecipient();
  }
  // Get Consultant
  @UseGuards(JwtAuthGuard)
  @Get('consultant')
  async getConsultant(
    @Query('search') search = '',
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit = 10,
  ) {
    limit = limit > 100 ? 100 : limit;
    return await this.useractivityService.findConsultant(
      {
        page,
        limit,
        route: 'consultant',
      },
      search,
    );
  }
}
