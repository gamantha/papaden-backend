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
import { UpdateBookDto } from "./dto/update-book.dto";

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

  // Update Book
  async updBook(updateBookDto: UpdateBookDto) {
    const book = await this.bookRepository.find({
      where: {
        book_id: updateBookDto.book_id
      },
    });
    // if (tempUser.length === 1) {
    //   await this.tempsAuthRepository.update(userData, updateUseractivityDto);
    //   return {
    //     statusCode: HttpStatus.OK,
    //     message: 'data member telah diupdate',
    //   };
    // } else {
    //   await this.permsAuthRepository.update(userData, updateUseractivityDto);
    //   return {
    //     statusCode: HttpStatus.OK,
    //     message: 'data member telah diupdate',
    //   };
    // }
    await this.bookRepository.update(updateBookDto.book_id, updateBookDto);
    return {
      statusCode: HttpStatus.OK,
      message: 'data member telah diupdate',
    };
  }


  async listsBooks(
    born_category_title: string,
    options: IPaginationOptions,
    search: string,
  ): Promise<Pagination<Book>> {
    const birthRange = await this.bornRepository.findOne({
      where: {
        born_category_title: born_category_title,
      },
    });
    const BooksIDs = new Date();
    const birth = new Date();
    const startDate = birth.setFullYear(
      BooksIDs.getFullYear() - birthRange.born_start_year,
    );
    const endDate = birth.setFullYear(
      BooksIDs.getFullYear() - birthRange.born_end_year,
    );
    const sd = new Date(startDate);
    const sdVals = moment(sd).format('YYYY:MM:DD HH:mm:ss');
    const nd = new Date(endDate);
    const ndVals = moment(nd).format('YYYY:MM:DD HH:mm:ss');
    console.log(sdVals + ' s/d ' + ndVals);
    const searchKeys = search;
    const queryBuilder = this.bookRepository
      .createQueryBuilder('activity_book')
      .where('activity_book.born_date BETWEEN :stdate AND :endate', {
        stdate: ndVals,
        endate: sdVals,
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
