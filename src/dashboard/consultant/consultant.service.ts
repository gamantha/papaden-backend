import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateConsultantDto } from './dto/create-consultant.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Consultant } from './entities/consultant.entity';
import { Brackets, Repository } from 'typeorm';
import { IPaginationOptions, paginate } from 'nestjs-typeorm-paginate';
import { UpdateConsultantDto } from './dto/update-consultant.dto';

@Injectable()
export class ConsultantService {
  constructor(
    @InjectRepository(Consultant)
    private consultantRepository: Repository<Consultant>,
  ) {}
  // Get Consultant
  async getConsultant(options: IPaginationOptions, search: string) {
    const searchKeys = search;
    const queryBuilder = this.consultantRepository
      .createQueryBuilder('admin_consultant')
      .where(
        new Brackets((qb) => {
          qb.where('admin_consultant.consultant_fullname like :search', {
            search: '%' + searchKeys + '%',
          });
        }),
      );
    return await paginate<Consultant>(queryBuilder, options);
  }
  // Create Consultant
  async createConsultant(createConsultantDto: CreateConsultantDto) {
    const { consultant_phone } = createConsultantDto;
    const regsConsultant = await this.consultantRepository.find({
      where: {
        consultant_phone: consultant_phone,
      },
    });

    if (regsConsultant.length === 1) {
      return {
        statusCode: HttpStatus.OK,
        message: 'konsultan telah berada di dalam lists',
      };
    } else {
      const valsConsultant =
        this.consultantRepository.create(createConsultantDto);
      await this.consultantRepository.save(valsConsultant);
      return {
        statusCode: HttpStatus.OK,
        message: 'konsultan telah berhasil ditambahkan ke dalam lists',
        data: valsConsultant,
      };
    }
  }
  // Update Consultant
  async updateConsultant(
    consultant_id: string,
    updateConsultantDto: UpdateConsultantDto,
  ) {
    await this.consultantRepository.update(consultant_id, updateConsultantDto);
    const updConsultant = await this.consultantRepository.findOne({
      where: {
        consultant_id: consultant_id,
      },
    });
    return {
      statusCode: HttpStatus.OK,
      message: 'konsultan telah berhasil diupdate',
      data: updConsultant,
    };
  }
  // Delete Consultant
  async removeConsultant(consultant_id: string) {
    await this.consultantRepository.delete(consultant_id);
    return {
      statusCode: HttpStatus.OK,
      message: 'konsultan telah berhasil dihapus',
    };
  }
}
