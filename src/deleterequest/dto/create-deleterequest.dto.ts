import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, isEmail, IsNotEmpty, IsOptional } from "class-validator";
import { BeforeInsert, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";
import cryptoconst from "crypto";

export class CreateDeleterequestDto {

  @ApiProperty({ example: 'perm user ID' })
  @IsOptional()
  perm_id: string;
  @ApiProperty({
    example: 'e.g account@domain.ext',
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;
  @ApiProperty({ example: 'e.g. requested, deleted' })
  @IsNotEmpty()
  status: string;
  @Column()
  reg_token: string;
  @CreateDateColumn()
  created_on: Date;
  @UpdateDateColumn()
  updated_on: Date;
  @BeforeInsert()
  async get_reg_token(){
    const cryptoconst = require('crypto');
    this.reg_token = cryptoconst.randomBytes(4).toString('hex');
    return this.reg_token;
  }

}
