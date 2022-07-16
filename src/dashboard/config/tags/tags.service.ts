import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateTagDto } from './dto/create-tag.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Tag } from './entities/tag.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TagsService {
  constructor(
    @InjectRepository(Tag)
    private tagRepository: Repository<Tag>,
  ) {}
  // Get Tag
  async getTag() {
    const listTags = await this.tagRepository.find();
    return {
      statusCode: HttpStatus.OK,
      message: 'list tag berhasil didapatkan',
      data: listTags,
    };
  }
  // Create Tag
  async createTag(createTagDto: CreateTagDto) {
    const { tags_category_title } = createTagDto;
    const tagsList = await this.tagRepository.find({
      where: {
        tags_category_title: tags_category_title,
      },
    });
    if (tagsList.length === 1) {
      return {
        statusCode: HttpStatus.OK,
        message: 'tags telah tersedia dalam lists',
      };
    } else {
      const valTags = await this.tagRepository.create(createTagDto);
      await this.tagRepository.save(valTags);
      return {
        statusCode: HttpStatus.OK,
        message: 'tags telah berhasil ditambahkan',
        data: valTags,
      };
    }
  }
  // Update Tag
  async updateTag(tags_category_id: number, createTagDto: CreateTagDto) {
    await this.tagRepository.update(tags_category_id, createTagDto);
    const upValsTags = await this.tagRepository.findOne({
      where: {
        tags_category_id: tags_category_id,
      },
    });
    return {
      statusCode: HttpStatus.OK,
      message: 'tags telah berhasil diupdate',
      data: upValsTags,
    };
  }
  // Delete Tag
  async removeTag(tags_category_id: number) {
    await this.tagRepository.delete(tags_category_id);
    return {
      statusCode: HttpStatus.OK,
      message: 'tags telah berhasil dihapus',
    };
  }
}
