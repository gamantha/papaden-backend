import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from './entities/book.entity';
import { Brackets, Repository } from 'typeorm';
import {
  IPaginationOptions,
  paginate,
  Pagination,
} from 'nestjs-typeorm-paginate';
import { Born } from '../../dashboard/config/born/entities/born.entity';
import { permsAuth } from '../../auth/entities/auth.entity';
import * as moment from 'moment';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book)
    private bookRepository: Repository<Book>,
    @InjectRepository(Born)
    private bornRepository: Repository<Born>,
    @InjectRepository(permsAuth)
    private permsAuthRepository: Repository<permsAuth>,
  ) {}

  async createBook(createBookDto: CreateBookDto) {
    const postBooks = await this.bookRepository.create(createBookDto);
    await this.bookRepository.save(postBooks);
    return {
      statusCode: HttpStatus.OK,
      message: 'permintaan teman bicara telah sukses terkirim',
      data: postBooks,
    };
  }

  async listsBooks(
    born_category_title: string,
    options: IPaginationOptions,
    userData: any,
    search: string,
  ): Promise<Pagination<Book>> {
    const birthRange = await this.bornRepository.findOne({
      where: {
        born_category_title: born_category_title,
      },
    });

    const profils = await this.permsAuthRepository.findOne({
      where: {
        id: userData,
      },
    });

    const BooksIDs = profils.born_date;
    const birth = new Date();
    const startDate = birth.setFullYear(
      BooksIDs.getFullYear() + birthRange.born_start_year,
    );
    const endDate = birth.setFullYear(
      BooksIDs.getFullYear() + birthRange.born_end_year,
    );

    const sd = new Date(startDate);
    const sdVals = moment(sd).format('YYYY:MM:DD HH:mm:ss');

    const nd = new Date(endDate);
    const ndVals = moment(nd).format('YYYY:MM:DD HH:mm:ss');

    const searchKeys = search;
    const queryBuilder = this.bookRepository
      .createQueryBuilder('activity_book')
      .where('activity_book.born_category_title BETWEEN :stdate AND :endate', {
        stdate: sdVals,
        endate: ndVals,
      })
      .andWhere(
        new Brackets((qb) => {
          qb.where('activity_book.fullname like :search', {
            search: '%' + searchKeys + '%',
          });
        }),
      );

    return paginate<Book>(queryBuilder, options);
  }
}
