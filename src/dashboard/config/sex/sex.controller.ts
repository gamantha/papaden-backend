import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SexService } from './sex.service';
import { CreateSexDto } from './dto/create-sex.dto';
import { UpdateSexDto } from './dto/update-sex.dto';

@Controller('sex')
export class SexController {
  constructor(private readonly sexService: SexService) {}

  @Post()
  create(@Body() createSexDto: CreateSexDto) {
    return this.sexService.create(createSexDto);
  }

  @Get()
  findAll() {
    return this.sexService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.sexService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSexDto: UpdateSexDto) {
    return this.sexService.update(+id, updateSexDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.sexService.remove(+id);
  }
}
