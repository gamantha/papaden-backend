import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { profilImage } from '../entities/useractivity.entity';
import { Repository } from 'typeorm';
import { ProfilUseractivityDto } from '../dto/profil-useractivity.dto';

@Injectable()
export class LocalService {
  constructor(
    @InjectRepository(profilImage)
    private profilimage: Repository<profilImage>,
  ) {}

  async saveProfilImage(profilUseractivityDto: ProfilUseractivityDto) {
    const profilData = await this.profilimage.create(profilUseractivityDto);
    await this.profilimage.save(profilData);
    return {
      statusCode: HttpStatus.OK,
      message: 'profil image successfully uploaded',
      data: profilData,
    };
  }
}
