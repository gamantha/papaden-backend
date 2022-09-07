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
    console.log(req.user)
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

  async updRecipientStatus(updateRecipientDto: UpdateRecipientDto, req: any) {
    console.log(req.user)
    const book = await this.recipientRegRepository.findOne({
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
    if (book.regs_volunteer === "") {
      updateRecipientDto.regs_volunteer = req.user.userId
    }

    await this.recipientRegRepository.update(updateRecipientDto.regs_id, updateRecipientDto);
    return {
      statusCode: HttpStatus.OK,
      message: 'data member telah diupdate',
    };
  }


  async listsRecipient(
    rec_cat_title: string,
    options: IPaginationOptions,
    search: string, req: any,
  ): Promise<Pagination<RecipientReg>> {
    const searchKeys = search;
    const queryBuilder = this.recipientRegRepository
      .createQueryBuilder('activity_recipient_register')
      .where('activity_recipient_register.rec_cat_title = :cats', {
        cats: rec_cat_title,
      })
      // .orWhere('activity_recipient_register.regs_volunteer = :regs_volunteer', {
      //   regs_volunteer: req.user.userId,
      // })
      .andWhere('(activity_recipient_register.regs_volunteer = :regs_volunteer OR activity_recipient_register.regs_volunteer = "")', {
        regs_volunteer: req.user.userId,
      })
      .andWhere(
        new Brackets((qb) => {
          qb.where('activity_recipient_register.regs_fullname like :search', {
            search: '%' + searchKeys + '%',
          });
        }),
      )
      // .orderBy('activity_recipient_register.regs_id', 'DESC')
    ;

    return await paginate<RecipientReg>(queryBuilder, options);
  }
}
