import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import * as bcrypt from 'bcrypt';

@Entity('temps_auth')
export class tempsAuth {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  fullname: string;
  @Column({
    nullable: true,
  })
  born_city: string;
  @Column('timestamp', {
    nullable: true,
  })
  born_date: Date;
  @Column({
    nullable: true,
  })
  sex_category_title: string;
  @Column()
  phone: string;
  @Column()
  email: string;
  @Column()
  password: string;
  @Column('boolean', { default: false })
  status = false;
  @CreateDateColumn({ type: 'datetime' })
  @Column('datetime', {
    nullable: true,
    name: 'created_on',
  })
  created_on: Date;
  @UpdateDateColumn({ type: 'datetime' })
  @Column('datetime', {
    nullable: true,
    name: 'updated_on',
  })
  updated_on: Date;
  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
    return this.password;
  }
}

@Entity('perms_auth')
export class permsAuth {
  @PrimaryGeneratedColumn()
  @Generated('uuid')
  id: string;
}
