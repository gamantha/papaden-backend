import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RecipientReg } from '../../../useractivity/recipient/entities/recipient.entity';
import { Brackets, Repository } from 'typeorm';
import { IPaginationOptions, paginate } from 'nestjs-typeorm-paginate';

@Injectable()
export class RecipientService {
  constructor(
    @InjectRepository(RecipientReg)
    private recipientAdminRepository: Repository<RecipientReg>,
  ) {}

  async getAdminRecipientLists(options: IPaginationOptions, search: string) {
    const searchKeys = search;
    const recipientQuery = this.recipientAdminRepository
      .createQueryBuilder('activity_recipient_register')
      .where(
        new Brackets((qbs) => {
          qbs.where(
            'activity_book.rec_cat_title like :search OR activity_recipient_register.regs_fullname like :search',
            {
              search: '%' + searchKeys + '%',
            },
          );
        }),
      );
    return paginate(recipientQuery, options);
  }
}
