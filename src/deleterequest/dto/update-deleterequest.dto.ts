import { ApiProperty, PartialType } from "@nestjs/swagger";
import { CreateDeleterequestDto } from './create-deleterequest.dto';
import { IsEmail, IsNotEmpty } from "class-validator";
import { AfterUpdate, BeforeInsert, Column } from "typeorm";
import cryptoconst from "crypto";

export class UpdateDeleterequestDto {
  @ApiProperty({ example: 'e.g. requested, deleted' })
  @IsNotEmpty()
  status: string;
  @Column()
  reg_token: string;
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @AfterUpdate()
  async get_reg_token() {
    const cryptoconst = require('crypto');
    this.reg_token = cryptoconst.randomBytes(4).toString('hex');
    return this.reg_token;

  }
}
