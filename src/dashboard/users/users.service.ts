import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { permsAuth, tempsAuth } from '../../auth/entities/auth.entity';
import { Brackets, Repository } from 'typeorm';
import { IPaginationOptions, paginate } from 'nestjs-typeorm-paginate';
import { TempsAuthDto } from '../../auth/dto/temps-auth.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(tempsAuth)
    private tempsAuthRepository: Repository<tempsAuth>,
    @InjectRepository(permsAuth)
    private permsAuthRepository: Repository<permsAuth>,
  ) {}
  // Get & Searh Register
  async getTempUsers(options: IPaginationOptions, search: string) {
    const searchKeys = search;
    const queryBuilder = this.tempsAuthRepository
      .createQueryBuilder('temps_auth')
      .where(
        new Brackets((qb) => {
          qb.where('temps_auth.email like :search', {
            search: '%' + searchKeys + '%',
          });
        }),
      );
    return await paginate<tempsAuth>(queryBuilder, options);
  }

  async getTempUsersIds(id: number) {
    return await this.tempsAuthRepository.find({
      where: {
        id: id,
      },
    });
  }
  // Post Register
  async postTempUsers(tempsAuthDto: TempsAuthDto) {
    const { email, phone } = tempsAuthDto;
    const findTempUsers = await this.tempsAuthRepository.find({
      where: [
        {
          email: email,
        },
        {
          phone: phone,
        },
      ],
    });
    const findPermUsers = await this.permsAuthRepository.find({
      where: [
        {
          email: email,
        },
        {
          phone: phone,
        },
      ],
    });
    if (findTempUsers.length === 1) {
      return {
        statusCode: HttpStatus.OK,
        message:
          'email / nomer telepon pengguna telah terdaftar dan menunggu verifikasi',
      };
    } else if (findPermUsers.length === 1) {
      return {
        statusCode: HttpStatus.OK,
        message:
          'email / nomer telepon pengguna telah berada dalam anggota terdaftar, silakan login',
      };
    } else {
      const regsTempUsers = this.tempsAuthRepository.create(tempsAuthDto);
      await this.tempsAuthRepository.save(tempsAuthDto);
      return {
        statusCode: HttpStatus.OK,
        message: 'pendaftaran telah berhasil. Silahkan periksa mailbox anda untuk verifikasi email',
        data: regsTempUsers,
      };
    }
  }
  // Delete Register
  async delTempUsers(id: number) {
    await this.tempsAuthRepository.delete(id);
    return {
      statusCode: HttpStatus.OK,
      message: 'data pendaftar telah dihapus',
    };
  }
  // Update Register
  async updTempUsers(id: number, updateUserDto: UpdateUserDto) {
    await this.tempsAuthRepository.update(id, updateUserDto);
    return {
      statusCode: HttpStatus.OK,
      message: 'data pendaftar telah diupdate',
    };
  }
  // Validate
  async valTempUsers(vals: any) {
    let emailListsSuccess: any = [];
    for (let i = 0; i < vals.length; i++) {
      const valsTempUsers = await this.tempsAuthRepository.findOne({
        where: {
          email: vals[i].email,
        },
      });
      if (valsTempUsers) {
        await this.tempsAuthRepository
          .createQueryBuilder()
          .insert()
          .into('perms_auth')
          .values({
            fullname: valsTempUsers.fullname,
            born_city: valsTempUsers.born_city,
            born_date: valsTempUsers.born_date,
            sex_category_title: valsTempUsers.sex_category_title,
            phone: valsTempUsers.phone,
            email: valsTempUsers.email,
            password: valsTempUsers.password,
            status: true,
          })
          .execute();
        emailListsSuccess += vals[i].email + ', ';
        await this.tempsAuthRepository.remove(valsTempUsers);
      }
    }
    return {
      statusCode: HttpStatus.OK,
      dataSuccess: emailListsSuccess,
    };
  }
  // Get & Searh Member
  async getPermUsers(options: IPaginationOptions, search: string) {
    const searchKeys = search;
    const queryBuilder = this.permsAuthRepository
      .createQueryBuilder('perms_auth')
      .where(
        new Brackets((qb) => {
          qb.where('perms_auth.email like :search', {
            search: '%' + searchKeys + '%',
          });
        }),
      );
    return await paginate<permsAuth>(queryBuilder, options);
  }

  async getPermUsersIds(id: string) {
    console.log(id);
    return await this.permsAuthRepository.find({
      where: {
        id: id,
      },
    });
  }
  // Delete Member
  async delPermUsers(id: string) {
    await this.permsAuthRepository.delete(id);
    return {
      statusCode: HttpStatus.OK,
      message: 'data member telah dihapus',
    };
  }
  // Update Member
  async updPermUsers(id: string, updateUserDto: UpdateUserDto) {
    await this.permsAuthRepository.update(id, updateUserDto);
    return {
      statusCode: HttpStatus.OK,
      message: 'data member telah diupdate',
    };
  }
}
