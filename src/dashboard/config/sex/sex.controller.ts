import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { SexService } from './sex.service';
import { CreateSexDto } from './dto/create-sex.dto';

@Controller('/dashboard/config/sex')
export class SexController {
  constructor(private readonly sexService: SexService) {}
  // Get Sex
  @Get('')
  async getSex() {
    return await this.sexService.getSex();
  }
  // Create Sex
  @Post('')
  async createSex(@Body() createSexDto: CreateSexDto) {
    return await this.sexService.createSex(createSexDto);
  }
  // Update Sex
  @Patch(':sex_category_id')
  async updateSex(
    @Param('sex_category_id') sex_category_id: number,
    @Body() createSexDto: CreateSexDto,
  ) {
    return await this.sexService.updateSex(sex_category_id, createSexDto);
  }
  // Delete Sex
  @Delete(':sex_category_id')
  async removeSex(@Param('sex_category_id') sex_category_id: number) {
    return await this.sexService.removeSex(sex_category_id);
  }
}
