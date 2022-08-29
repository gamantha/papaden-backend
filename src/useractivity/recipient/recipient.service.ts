import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateRecipientDto } from './dto/create-recipient.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { RecipientReg } from './entities/recipient.entity';
import { Brackets, Repository } from 'typeorm';
import {
  IPaginationOptions,
  paginate,
  Pagination,
} from 'nestjs-typeorm-paginate';
import { UpdateBookDto } from "../books/dto/update-book.dto";
import { UpdateRecipientDto } from "../recipient/dto/update-recipient.dto";

@Injectable()
export class RecipientService {
  constructor(
    @InjectRepository(RecipientReg)
    private recipientRegRepository: Repository<RecipientReg>,
  ) {}

  async registerRecipient(createRecipientDto: CreateRecipientDto) {
    const postRecipient = await this.recipientRegRepository.create(
      createRecipientDto,
    );
    await this.recipientRegRepository.save(postRecipient);
    return {
      statusCode: HttpStatus.OK,
      message: 'registrasi penerima donasi telah sukses terkirim',
      data: postRecipient,
    };
  }

  async updRecipient(updateRecipientDto: UpdateRecipientDto, req: any) {
    console.log(req.user.id)
    const book = await this.recipientRegRepository.find({
      where: {
        regs_id: updateRecipientDto.regs_id
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
    await this.recipientRegRepository.update(updateRecipientDto.regs_id, updateRecipientDto);
    return {
      statusCode: HttpStatus.OK,
      message: 'data member telah diupdate',
    };
  }


  async listsRecipient(
    rec_cat_title: string,
    options: IPaginationOptions,
    search: string,
  ): Promise<Pagination<RecipientReg>> {
    const searchKeys = search;
    const queryBuilder = this.recipientRegRepository
      .createQueryBuilder('activity_recipient_register')
      .where('activity_recipient_register.rec_cat_title = :cats', {
        cats: rec_cat_title,
      })
      .andWhere(
        new Brackets((qb) => {
          qb.where('activity_recipient_register.regs_fullname like :search', {
            search: '%' + searchKeys + '%',
          });
        }),
      );

    return await paginate<RecipientReg>(queryBuilder, options);
  }
}
