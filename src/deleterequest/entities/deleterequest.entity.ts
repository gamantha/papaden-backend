import {
  AfterInsert,
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity, EntitySubscriberInterface, EventSubscriber,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";
import cryptoconst from "crypto";
import crypto from "crypto";


@Entity('delete_request')
@EventSubscriber()
export class Deleterequest {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ nullable: true })
  perm_id: string;
  @Column({ nullable: true })
  email: string;
  @Column({
    nullable: true,
  })
  status: string;
  @Column({ nullable: true })
  reg_token: string;
  @CreateDateColumn()
  created_on: Date;
  @UpdateDateColumn()
  updated_on: Date;
  @AfterInsert()

  @BeforeInsert()
  async get_reg_token(){
    const cryptoconst = require('crypto');
    this.reg_token = cryptoconst.randomBytes(4).toString('hex');
    return this.reg_token;
  }

  // @BeforeInsert(event: InsertEvent<any>)
  // getRegToken(){
  //   // const cryptoconst = require('crypto');
  //   // console.log(`BEFORE POST INSERTED: `, event.entity)
  //   // this.reg_token = cryptoconst.randomBytes(4).toString('hex');
  //   // return this.reg_token;
  // }
}
