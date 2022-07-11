import { Injectable } from '@nestjs/common';
import { CreateSexDto } from './dto/create-sex.dto';
import { UpdateSexDto } from './dto/update-sex.dto';

@Injectable()
export class SexService {
  create(createSexDto: CreateSexDto) {
    return 'This action adds a new sex';
  }

  findAll() {
    return `This action returns all sex`;
  }

  findOne(id: number) {
    return `This action returns a #${id} sex`;
  }

  update(id: number, updateSexDto: UpdateSexDto) {
    return `This action updates a #${id} sex`;
  }

  remove(id: number) {
    return `This action removes a #${id} sex`;
  }
}
