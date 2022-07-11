import {
  Controller,
  Post,
  Body,
  Get,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { BornService } from './born.service';
import { CreateBornDto } from './dto/create-born.dto';

@Controller('/dashboard/config/born')
export class BornController {
  constructor(private readonly bornService: BornService) {}
  // Get Born
  @Get('')
  async getBorn() {
    return await this.bornService.getBorn();
  }
  // Create Born
  @Post('')
  async createBorn(@Body() createBornDto: CreateBornDto) {
    return await this.bornService.createBorn(createBornDto);
  }
  // Update Born
  @Patch(':born_category_id')
  async updateBorn(
    @Param('born_category_id') born_category_id: number,
    @Body() createBornDto: CreateBornDto,
  ) {
    return await this.bornService.updateBorn(born_category_id, createBornDto);
  }
  // Delete Born
  @Delete(':born_category_id')
  async removeBorn(@Param('born_category_id') born_category_id: number) {
    return await this.bornService.removeBorn(born_category_id);
  }
}
