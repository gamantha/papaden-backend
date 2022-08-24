import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  Generated, JoinColumn, OneToMany, OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";
import * as bcrypt from 'bcrypt';
import crypto from "crypto";
import cryptoconst from "crypto";
import { Transform } from "class-transformer";
import { profilImage } from "../../useractivity/entities/useractivity.entity";

@Entity('temps_auth')
export class tempsAuth {
  @PrimaryGeneratedColumn()
  // @Transform(({ value }) => (value).toString())
  id: number;
  @Column()
  fullname: string;
  @Column({
    nullable: true,
  })
  born_city: string;
  @Column('datetime', {
    nullable: true,
  })
  born_date: Date;
  @Column({
    nullable: true,
  })
  sex_category_title: string;
  @Column({ nullable: true })
  phone: string;
  @Column({ unique: true })
  email: string;
  @Column()
  password: string;
  @Column('boolean', { default: false })
  status = false;
  @CreateDateColumn()
  created_on: Date;
  @UpdateDateColumn()
  updated_on: Date;
  @Column({ nullable: true })
  reg_token: string;
  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
    return this.password;
  }
  async validatePassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
  }
  @BeforeInsert()
  async get_reg_token(){
    const cryptoconst = require('crypto');
    this.reg_token = cryptoconst.randomBytes(4).toString('hex');
    return this.reg_token;
  }

}

@Entity('perms_auth')
export class permsAuth {
  @PrimaryGeneratedColumn()
  @Generated('uuid')
  id: string;
  @Column()
  fullname: string;
  @Column({
    nullable: true,
  })
  born_city: string;
  @Column('datetime', {
    nullable: true,
  })
  born_date: Date;
  @Column({
    nullable: true,
  })
  sex_category_title: string;
  // @Column({ unique: true })
  @Column({ nullable: true })
  phone: string;
  @Column({ unique: true })
  email: string;
  @Column()
  password: string;
  @Column({ default: true })
  status: boolean;
  @Column({ default: "new" })
  isvolunteer: string;
  @Column({ default: "new" })
  isrecipient: string;
  @CreateDateColumn()
  created_on: Date;
  @UpdateDateColumn()
  updated_on: Date;
  // @OneToMany(type => profilImage, profilimage => profilimage.id)
  // profilimages: profilImage[];
  @Column({ default: null })
  imageurl: string;
  // @JoinColumn()
  // profil_image: profilImage
  // @OneToMany(() => profilImage, (profile_image) => profile_image.id)


  // @OneToMany(type => Photo, photo => photo.user)
  // photos: Photo[];
  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
    return this.password;
  }
  async validatePassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
  }
}
