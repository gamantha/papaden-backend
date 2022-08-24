import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from './entities/book.entity';
import { Brackets, Repository } from 'typeorm';
import { IPaginationOptions, paginate } from 'nestjs-typeorm-paginate';
import { Consultant } from '../../consultant/entities/consultant.entity';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book)
    private bookAdminRepository: Repository<Book>,
    @InjectRepository(Consultant)
    private consultantAdminRepository: Repository<Consultant>,
  ) {}

  async getAdminBookLists(options: IPaginationOptions, search: string) {
    const searchKeys = search;
    console.log("get books")
    console.log(search)
    const booksQuery = this.bookAdminRepository
      .createQueryBuilder('activity_book')
      .where(
        new Brackets((qbs) => {
          qbs.where(
            'activity_book.consultant_fullname like :search OR activity_book.fullname like :search',
            {
              search: '%' + searchKeys + '%',
            },
          );
        }),
      );
    return paginate(booksQuery, options);
  }

  async getAdminBookIds(book_id: number) {
    const varAdminBookIds = await this.bookAdminRepository.find({
      where: {
        book_id: book_id,
      },
    });
    return {
      statusCode: HttpStatus.OK,
      message: 'data permintaan pertemuan telah berhasil didapatkan',
      data: varAdminBookIds,
    };
  }

  async getAdminConsultantIds(consultant_id: string) {
    const varConsultantIds = await this.consultantAdminRepository.findOne({
      where: {
        consultant_id: consultant_id,
      },
    });
    return {
      statusCode: HttpStatus.OK,
      message: 'data teman bicara telah berhasil didapatkan',
      data: varConsultantIds,
    };
  }
}
