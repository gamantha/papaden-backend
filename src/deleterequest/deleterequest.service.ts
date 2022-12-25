import { HttpStatus, Injectable } from "@nestjs/common";
import { CreateDeleterequestDto } from './dto/create-deleterequest.dto';
import { UpdateDeleterequestDto } from './dto/update-deleterequest.dto';
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { permsAuth } from "../auth/entities/auth.entity";
import { MailService } from "../mail/mail.service";
import { Deleterequest } from "./entities/deleterequest.entity";
import cryptoconst from "crypto";

@Injectable()
export class DeleterequestService {
  constructor(

    @InjectRepository(Deleterequest)
    private deleterequestRepository: Repository<Deleterequest>,

    @InjectRepository(permsAuth)
    private permsAuthRepository: Repository<permsAuth>,
    private mailService: MailService,
  ) {}

   get_reg_token() {
    const cryptoconst = require('crypto');
    const reg_token = cryptoconst.randomBytes(4).toString('hex');
    return reg_token;
  }

  async create(createDeleterequestDto: CreateDeleterequestDto, req: any) {
    createDeleterequestDto.reg_token = this.get_reg_token();

    const permAuth = await this.permsAuthRepository.findOne({
      where: {
        email: createDeleterequestDto.email,
      },
    });

    if (permAuth === null) {
      console.log('no user exist');
      return {
        statusCode: HttpStatus.NOT_FOUND,
        message: createDeleterequestDto.email + ' NOT FOUND',
      };
    } else {
      console.log('create delete request');
      const postDeleterequest = await this.deleterequestRepository.save(
        createDeleterequestDto,
      );
      await this.mailService.deleteRequestConfirmation(postDeleterequest);
      return {
        statusCode: HttpStatus.OK,
        message: 'Silahkan periksa mailbox anda untuk verifikasi',
        data: postDeleterequest,
      };
    }


    // return 'This action adds a new deleterequest';
  }


  findAll() {
    return `This action returns all deleterequest`;
  }

  findOne(id: number) {
    return `This action returns a #${id} deleterequest`;
  }

  async getRequest(createDeleterequestDto: CreateDeleterequestDto, req: any) {
    const deleteRequest = await this.deleterequestRepository.findOne({
      where: {
        email: createDeleterequestDto.email,
      },
    });
    if (deleteRequest !== null) {
      console.log('delete request FOUND');
    } else {
      console.log('delete request NOT FOUND');
    }



  };


  async find(email: string) {
    const deleteRequest = await this.deleterequestRepository.findOne({
      where: {
        email: email,
      },
    });

    const permAuth = await this.permsAuthRepository.findOne({
      where: {
        email: email,
      },
    });

    if (permAuth === null) {
      console.log('no user exist');
      return {
        statusCode: HttpStatus.NOT_FOUND,
        message: email + ' NOT FOUND',
      };
    }

    if (deleteRequest === null) {
      return {
        statusCode: HttpStatus.NOT_FOUND,
        message: 'NO delete request found',
      };
    }


    if (deleteRequest.reg_token == deleteRequest.reg_token) {
      deleteRequest.status = 'deleted';
      permAuth.email = permAuth.email + '-' + Date.now();
      permAuth.status = false;
      const updateRequest = await this.deleterequestRepository.update(
        deleteRequest.id,
        deleteRequest,
      );
      const updatePerms = await this.permsAuthRepository.update(
        permAuth.id,
        permAuth,
      );
      // return permAuth.email + ' has been deleted';
      return {
        statusCode: HttpStatus.OK,
        message: permAuth.email + ' has been deleted',
      };

    } else {
      console.log('NOT MATCH');
      // return permAuth.email + ' has NOT been deleted : TOKEN INVALID';
      return {
        statusCode: HttpStatus.UNAUTHORIZED,
        message: email + ' has NOT been deleted : TOKEN INVALID',
      };
    }

  }

  update(id: number, updateDeleterequestDto: UpdateDeleterequestDto) {
    console.log(updateDeleterequestDto.status);
    return `This action updates a #${id} deleterequest`;
  }

  async resend(id: number, updateDeleterequestDto: UpdateDeleterequestDto) {
    console.log('resend');
    updateDeleterequestDto.reg_token = this.get_reg_token();
    const updateRequest = await this.deleterequestRepository.update(
      id,
      updateDeleterequestDto,
    );
    const permAuth = await this.permsAuthRepository.findOne({
      where: {
        email: updateDeleterequestDto.email,
      },
    });

    // await this.mailService.deleteRequestResendConfirmation(updateRequest);
    if (permAuth === null) {
      console.log('no user exist');
      return {
        statusCode: HttpStatus.NOT_FOUND,
        message: updateDeleterequestDto.email + ' NOT FOUND',
      };
    } else {
      return {
        statusCode: HttpStatus.OK,
        message: 'Silahkan periksa mailbox anda untuk verifikasi',
        data: updateRequest,
      };
    }


  }
  remove(id: number) {
    return `This action removes a #${id} deleterequest`;
  }

  findByEmail(s: string) {
    const deleteRequest = this.deleterequestRepository.findOne({
      where: {
        email: s,
      },
    });

  return deleteRequest;
    // if (deleteRequest.length === 0) {}


  }
}
