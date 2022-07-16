import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateRecipientDto } from './dto/create-recipient.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { RecipientReg } from './entities/recipient.entity';
import { Repository } from 'typeorm';
import { Book } from '../books/entities/book.entity';

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
}
