import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateSexDto } from './dto/create-sex.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Sex } from './entities/sex.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SexService {
  constructor(
    @InjectRepository(Sex)
    private sexRepository: Repository<Sex>,
  ) {}
  // Get Sex Service
  async getSex() {
    const sexVals = await this.sexRepository.find();
    return {
      statusCode: HttpStatus.OK,
      message: 'list gender telah berhasil didapatkan',
      data: sexVals,
    };
  }
  // Create Sex Service
  async createSex(createSexDto: CreateSexDto) {
    const { sex_category_title } = createSexDto;
    const sexCats = await this.sexRepository.find({
      where: {
        sex_category_title: sex_category_title,
      },
    });
    if (sexCats.length === 1) {
      return {
        statusCode: HttpStatus.OK,
        message: 'kategori gender telah ada di dalam lists',
      };
    } else {
      const valsSex = this.sexRepository.create(createSexDto);
      await this.sexRepository.save(valsSex);
      return {
        statusCode: HttpStatus.OK,
        message: 'kategori gender telah berhasil ditambahkan dalam lists',
        data: valsSex,
      };
    }
  }
  // Update Sex Service
  async updateSex(sex_category_id: number, createSexDto: CreateSexDto) {
    await this.sexRepository.update(sex_category_id, createSexDto);
    const upValsSex = await this.sexRepository.findOne({
      where: {
        sex_category_id: sex_category_id,
      },
    });
    return {
      statusCode: HttpStatus.OK,
      message: 'kategori gender telah berhasil diupdate',
      data: upValsSex,
    };
  }
  // Delete Sex Service
  async removeSex(sex_category_id: number) {
    await this.sexRepository.delete(sex_category_id);
    return {
      statusCode: HttpStatus.OK,
      message: 'kategori gender telah berhasil dihapus',
    };
  }
}
