import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateBornDto } from './dto/create-born.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Born } from './entities/born.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BornService {
  constructor(
    @InjectRepository(Born)
    private bornRepository: Repository<Born>,
  ) {}
  // Get Born Service
  async getBorn() {
    const bornVals = await this.bornRepository.find();
    return {
      statusCode: HttpStatus.OK,
      message: 'list kategori usia telah berhasil didapatkan',
      data: bornVals,
    };
  }
  // Create Born Service
  async createBorn(createBornDto: CreateBornDto) {
    const { born_category_title } = createBornDto;
    const bornCats = await this.bornRepository.find({
      where: {
        born_category_title: born_category_title,
      },
    });
    if (bornCats.length === 1) {
      return {
        statusCode: HttpStatus.OK,
        message: 'kategori usia telah ada di dalam lists',
      };
    } else {
      const valsBorn = this.bornRepository.create(createBornDto);
      await this.bornRepository.save(valsBorn);
      return {
        statusCode: HttpStatus.OK,
        message: 'kategori usia berhasil ditambahkan dalam lists',
        data: valsBorn,
      };
    }
  }
  // Update Born Service
  async updateBorn(born_category_id: number, createBornDto: CreateBornDto) {
    await this.bornRepository.update(born_category_id, createBornDto);
    const upValsBorn = await this.bornRepository.findOne({
      where: {
        born_category_id: born_category_id,
      },
    });
    return {
      statusCode: HttpStatus.OK,
      message: 'kategori usia telah berhasil diupdate',
      data: upValsBorn,
    };
  }
  // Delete Born Service
  async removeBorn(born_category_id: number) {
    await this.bornRepository.delete(born_category_id);
    return {
      statusCode: HttpStatus.OK,
      message: 'kategori usia telah berhasil dihapus',
    };
  }
}
