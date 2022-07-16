import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TagsService } from './tags.service';
import { CreateTagDto } from './dto/create-tag.dto';

@Controller('/dashboard/config/tag')
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}
  // Get Born
  @Get('')
  async getTag() {
    return await this.tagsService.getTag();
  }
  // Create Born
  @Post('')
  async createTag(@Body() createTagDto: CreateTagDto) {
    return await this.tagsService.createTag(createTagDto);
  }
  // Update Born
  @Patch(':tags_category_id')
  async updateTag(
    @Param('tags_category_id') tags_category_id: number,
    @Body() createTagDto: CreateTagDto,
  ) {
    return await this.tagsService.updateTag(tags_category_id, createTagDto);
  }
  // Delete Born
  @Delete(':tags_category_id')
  async removeTag(@Param('tags_category_id') tags_category_id: number) {
    return await this.tagsService.removeTag(tags_category_id);
  }
}
