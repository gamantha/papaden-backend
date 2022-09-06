import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { permsAuth, tempsAuth } from '../auth/entities/auth.entity';
import { Brackets, Repository } from 'typeorm';
import { Born } from '../dashboard/config/born/entities/born.entity';
import { Tag } from '../dashboard/config/tags/entities/tag.entity';
import { Recipient } from '../dashboard/config/recipient/entities/recipient.entity';
import { Consultant } from '../dashboard/consultant/entities/consultant.entity';
import { IPaginationOptions, paginate } from 'nestjs-typeorm-paginate';
import { profilImage } from './entities/useractivity.entity';
import { UpdateUseractivityDto } from './dto/update-useractivity.dto';
import { PasswordUseractivityDto } from './dto/password-useractivity.dto';
import * as bcrypt from 'bcrypt';
import { ProfilUseractivityDto } from './dto/profil-useractivity.dto';
import { MailService } from '../mail/mail.service';
import { Book } from './books/entities/book.entity';
import { RatingDto } from "./dto/rating.dto";

@Injectable()
export class UseractivityService {
  constructor(
    @InjectRepository(permsAuth)
    private permsAuthRepository: Repository<permsAuth>,
    @InjectRepository(tempsAuth)
    private tempsAuthRepository: Repository<tempsAuth>,
    @InjectRepository(Born)
    private bornRepository: Repository<Born>,
    @InjectRepository(Tag)
    private tagRepository: Repository<Tag>,
    @InjectRepository(Recipient)
    private recipientRepository: Repository<Recipient>,
    @InjectRepository(Consultant)
    private consultantRepository: Repository<Consultant>,
    @InjectRepository(Book)
    private bookRepository: Repository<Book>,
    @InjectRepository(profilImage)
    private profilImageRepository: Repository<profilImage>,
    private mailService: MailService,
  ) {}
  // Get Profil
  async findProfil(vals: any) {
    const profilsTemp = await this.tempsAuthRepository.find({
      where: {
        id: vals,
      },
    });

    const profilsPerm = await this.permsAuthRepository.find({
      where: {
        id: vals,
      },
    });

    const profilImage = await this.profilImageRepository.findOne({
      where: {
        id: vals,
      },
    });

    // console.log(profilImage.profil_filename)
    // profilsPerm[0].imageurl = profilImage.profil_filename
    // terakhir diatas ini tambahin profileImage

    if (profilsTemp.length === 1) {
      return {
        statusCode: HttpStatus.OK,
        message: 'profil user berhasil didapatkan',
        profils: profilsTemp,
      };
    } else {
      return {
        statusCode: HttpStatus.OK,
        message: 'profil user berhasil didapatkan',
        profils: profilsPerm,
      };
    }
  }
  // Update Profil
  async updProfil(userData: any, updateUseractivityDto: UpdateUseractivityDto) {
    const tempUser = await this.tempsAuthRepository.find({
      where: {
        id: userData,
      },
    });
    if (tempUser.length === 1) {
      await this.tempsAuthRepository.update(userData, updateUseractivityDto);
      return {
        statusCode: HttpStatus.OK,
        message: 'data member telah diupdate',
      };
    } else {
      await this.permsAuthRepository.update(userData, updateUseractivityDto);
      return {
        statusCode: HttpStatus.OK,
        message: 'data member telah diupdate',
      };
    }
  }

  // Update Recipient
  async requestRecipient(
    userData: any,
    updateUseractivityDto: UpdateUseractivityDto,
  ) {
    const permUser = await this.permsAuthRepository.find({
      where: {
        id: userData,
      },
    });
    if (permUser.length === 1) {
      console.log('user found');
      await this.permsAuthRepository.update(userData, updateUseractivityDto);
      console.log(permUser);
      await this.mailService.sendRequestNotification(
        permUser[0],
        'penerima bantuan',
      );
      return {
        statusCode: HttpStatus.OK,
        message: 'data member telah diupdate',
      };
    } else {
      return {
        statusCode: HttpStatus.NOT_FOUND,
        message: 'no user found',
      };
    }
  }

  // Update VOlunteer
  async requestVolunteer(
    userData: any,
    updateUseractivityDto: UpdateUseractivityDto,
  ) {
    console.log('request volunteer');
    const permUser = await this.permsAuthRepository.find({
      where: {
        id: userData,
      },
    });
    if (permUser.length === 1) {
      await this.permsAuthRepository.update(userData, updateUseractivityDto);
      return {
        statusCode: HttpStatus.OK,
        message: 'data member telah diupdate',
      };
    } else {
      return {
        statusCode: HttpStatus.NOT_FOUND,
        message: 'no user found',
      };
    }
  }

  // Upload Profil Image
  async avatarUpload(id: string, file: Express.Multer.File) {
    const avatarData = await this.profilImageRepository.find({
      where: {
        id: id,
      },
    });
    const authPerm = await this.permsAuthRepository.find({
      where: {
        id: id,
      },
    });

    const consultant = await this.consultantRepository.find({
      where: {
        user_id: id,
      },
    });

    if (avatarData.length === 1) {
      await this.profilImageRepository
        .createQueryBuilder()
        .update('profil_image')
        .set({
          profil_filename: file.path,
          profil_path: file.originalname,
          profil_mimetype: file.mimetype,
        })
        .where('id = :id', { id: id })
        .execute();

      await this.permsAuthRepository
        .createQueryBuilder()
        .update('perms_auth')
        .set({
          imageurl: file.path,
        })
        .where('id = :id', { id: id })
        .execute();

      if (consultant.length === 1) {
        await this.consultantRepository
          .createQueryBuilder()
          .update('admin_consultant')
          .set({
            consultant_profil_url: file.path,
          })
          .where('user_id = :id', { id: id })
          .execute();
      }

      return {
        statusCode: HttpStatus.OK,
        message: 'profil image user telah berhasil diupdate',
      };
    } else {
      await this.profilImageRepository
        .createQueryBuilder()
        .insert()
        .into('profil_image')
        .values({
          id: id,
          profil_filename: file.path,
          profil_path: file.originalname,
          profil_mimetype: file.mimetype,
        })
        .execute();

      await this.permsAuthRepository
        .createQueryBuilder()
        .update('perms_auth')
        .set({
          imageurl: file.path,
        })
        .where('id = :id', { id: id })
        .execute();
      if (consultant.length === 1) {
        await this.consultantRepository
          .createQueryBuilder()
          .update('admin_consultant')
          .set({
            consultant_profil_url: file.path,
          })
          .where('user_id = :id', { id: id })
          .execute();
      }
      return {
        statusCode: HttpStatus.OK,
        message: 'profil image user telah berhasil diupload',
      };
    }
  }
  // Get Profil Image
  async avatarGet(id: string) {
    const avatarData = await this.profilImageRepository.findOne({
      where: {
        id: id,
      },
    });
    return {
      statusCode: HttpStatus.OK,
      message: 'profil image user telah berhasil didapatkan',
      data: avatarData,
    };
  }
  // Get Born
  async findBorn() {
    const getBook = await this.bornRepository.find();
    return {
      statusCode: HttpStatus.OK,
      message: 'data kategori usia berhasil didapatkan',
      data: getBook,
    };
  }
  // Get Tag
  async findTag() {
    const getTag = await this.tagRepository.find();
    return {
      statusCode: HttpStatus.OK,
      message: 'data tag berhasil didapatkan',
      data: getTag,
    };
  }
  // Get Recipient
  async findRecipient() {
    const getRecipient = await this.recipientRepository.find();
    return {
      statusCode: HttpStatus.OK,
      message: 'data kategori penerima berhasil didapatkan',
      data: getRecipient,
    };
  }

  // Get Consultant by user_id
  async findConsultant(vals: any) {
    console.log('consulta');
    console.log(vals);

    const consultantUser = await this.consultantRepository.find({
      where: {
        user_id: vals,
      },
    });
    let score;
    if (consultantUser.length === 1) {
      const rating = await this.bookRepository
        .createQueryBuilder("activity_book")
        .select("AVG(rating) avg")
        .where("activity_book.status like \"closed\"")
        .andWhere("activity_book.consultant_id like :consultant_id", {consultant_id: consultantUser[0].consultant_id})
        .execute();
      console.log(rating[0].avg);

      score = parseFloat(rating[0].avg).toFixed(2);
      consultantUser[0].consultant_rating = score;
      // const jsonData = JSON.parse(rating)

      // console.log(jsonData)
      // consultantUser[0].consultant_rating =
      return consultantUser;
    } else {
      return {
        statusCode: HttpStatus.NOT_FOUND,
        message: "no user"
      };
    }
  }

  // Get Consultants
  async findConsultants(options: IPaginationOptions, search: string) {
    const searchKeys = search;
    const queryBuilder = this.consultantRepository
      .createQueryBuilder('admin_consultant')
      // .leftJoinAndSelect("admin_consultant.profilimage", "admin_consultant")
      .where(
        new Brackets((qb) => {
          qb.where('admin_consultant.consultant_fullname like :search', {
            search: '%' + searchKeys + '%',
          });
        }),
      );
    return await paginate<Consultant>(queryBuilder, options);
  }

  // Update Password
  async recoveryPassword(
    userData: any,
    passwordUseractivityDto: PasswordUseractivityDto,
  ) {
    const { password } = passwordUseractivityDto;
    const tempUserPass = await this.tempsAuthRepository.find({
      where: {
        id: userData,
      },
    });
    const passwordUpdate: string = await bcrypt.hash(password, 10);
    if (tempUserPass.length === 1) {
      await this.tempsAuthRepository
        .createQueryBuilder()
        .update('temps_auth')
        .set({
          password: passwordUpdate,
        })
        .where('id = :id', { id: userData })
        .execute();
      return {
        statusCode: HttpStatus.OK,
        message: 'password telah diupdate',
      };
    } else {
      await this.permsAuthRepository
        .createQueryBuilder()
        .update('perms_auth')
        .set({
          password: passwordUpdate,
        })
        .where('id = :id', { id: userData })
        .execute();
      return {
        statusCode: HttpStatus.OK,
        message: 'password telah diupdate',
      };
    }
  }

  async giveRating(body: any){
    // console.log(ratingDto)
    // console.log(req)
    console.log(body.book_id)
    // console.log(req.user.userId);
    const rating = await this.bookRepository
      .createQueryBuilder("activity_book")
      .update("activity_book")
      .set({rating: body.rating})
      .where("activity_book.book_id like :book_id", {book_id: body.book_id })
      .andWhere("activity_book.id like :id", {id: body.user_id })
      .execute();
    console.log(rating)
    return {
      statusCode: HttpStatus.OK,
      message: rating,
    };
  }



}
