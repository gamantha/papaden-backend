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
  @Column({ unique: true })
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

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
    return this.password;
  }
  async validatePassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
  }
}

@Entity('perms_auth')
export class permsAuth {
  @PrimaryGeneratedColumn()
  @Generated('uuid')
  id: string;
  @Column()
  fullname: string;
  @Column()
  born_city: string;
  @Column('timestamp')
  born_date: Date;
  @Column()
  sex_category_title: string;
  @Column({ unique: true })
  phone: string;
  @Column({ unique: true })
  email: string;
  @Column()
  password: string;
  @Column()
  status: boolean;
  @CreateDateColumn()
  created_on: Date;
  @UpdateDateColumn()
  updated_on: Date;
  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
    return this.password;
  }
  async validatePassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
  }
}
