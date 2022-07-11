import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateRecipientDto } from './dto/create-recipient.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Recipient } from './entities/recipient.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RecipientService {
  constructor(
    @InjectRepository(Recipient)
    private recipientRepository: Repository<Recipient>,
  ) {}
  // Get Recipient Service
  async getRecipients() {
    const recipientVals = await this.recipientRepository.find();
    return {
      statusCode: HttpStatus.OK,
      message: 'list kategori donatur telah berhasil didapatkan',
      data: recipientVals,
    };
  }
  // Create Recipient Service
  async createRecipient(createRecipientDto: CreateRecipientDto) {
    const { rec_cat_title } = createRecipientDto;
    const regCats = await this.recipientRepository.find({
      where: {
        rec_cat_title: rec_cat_title,
      },
    });
    if (regCats.length === 1) {
      return {
        statusCode: HttpStatus.OK,
        message: 'kategori donatur tersedia di dalam lists',
      };
    } else {
      const valsCats = this.recipientRepository.create(createRecipientDto);
      await this.recipientRepository.save(valsCats);
      return {
        statusCode: HttpStatus.OK,
        message: 'kategori donatur berhasil ditambahkan dalam lists',
        data: valsCats,
      };
    }
  }
  // Update Recipient Service
  async updateRecipient(
    rec_cat_id: number,
    createRecipientDto: CreateRecipientDto,
  ) {
    await this.recipientRepository.update(rec_cat_id, createRecipientDto);
    const updVals = await this.recipientRepository.findOne({
      where: {
        rec_cat_id: rec_cat_id,
      },
    });
    return {
      statusCode: HttpStatus.OK,
      message: 'kategori donatur telah berhasil diupdate',
      data: updVals,
    };
  }
  // Delete Recipient Service
  async removeRecipient(rec_cat_id: number) {
    await this.recipientRepository.delete(rec_cat_id);
    return {
      statusCode: HttpStatus.OK,
      message: 'kategori donatur telah berhasil dihapus',
    };
  }
}
