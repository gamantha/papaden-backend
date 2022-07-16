import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { permsAuth, tempsAuth } from '../auth/entities/auth.entity';
import { Brackets, Repository } from 'typeorm';
import { Born } from '../dashboard/config/born/entities/born.entity';
import { Tag } from '../dashboard/config/tags/entities/tag.entity';
import { Recipient } from '../dashboard/config/recipient/entities/recipient.entity';
import { Consultant } from '../dashboard/consultant/entities/consultant.entity';
import { IPaginationOptions, paginate } from 'nestjs-typeorm-paginate';

@Injectable()
export class UseractivityService {
  constructor(
    @InjectRepository(permsAuth)
    private permsAuthRepository: Repository<permsAuth>,
    @InjectRepository(tempsAuth)
    private tempsAuthRepository: Repository<tempsAuth>,
    @InjectRepository(Born)
    private bornRepository: Repository<Born>,
    @InjectRepository(Tag)
    private tagRepository: Repository<Tag>,
    @InjectRepository(Recipient)
    private recipientRepository: Repository<Recipient>,
    @InjectRepository(Consultant)
    private consultantRepository: Repository<Consultant>,
  ) {}
  // Get Profil
  async findProfil(vals: any) {
    const profilsTemp = await this.tempsAuthRepository.find({
      where: {
        id: vals,
      },
    });

    const profilsPerm = await this.permsAuthRepository.find({
      where: {
        id: vals,
      },
    });

    if (profilsTemp.length === 1) {
      return {
        statusCode: HttpStatus.OK,
        message: 'profil user berhasil didapatkan',
        profils: profilsTemp,
      };
    } else {
      return {
        statusCode: HttpStatus.OK,
        message: 'profil user berhasil didapatkan',
        profils: profilsPerm,
      };
    }
  }
  // Get Born
  async findBorn() {
    const getBook = await this.bornRepository.find();
    return {
      statusCode: HttpStatus.OK,
      message: 'data kategori usia berhasil didapatkan',
      data: getBook,
    };
  }
  // Get Tag
  async findTag() {
    const getTag = await this.tagRepository.find();
    return {
      statusCode: HttpStatus.OK,
      message: 'data tag berhasil didapatkan',
      data: getTag,
    };
  }
  // Get Recipient
  async findRecipient() {
    const getRecipient = await this.recipientRepository.find();
    return {
      statusCode: HttpStatus.OK,
      message: 'data kategori penerima berhasil didapatkan',
      data: getRecipient,
    };
  }
  // Get Consultant
  async findConsultant(options: IPaginationOptions, search: string) {
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
}
