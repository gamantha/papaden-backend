import {
  Column,
  CreateDateColumn,
  Entity, JoinColumn, OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { IsOptional } from "class-validator";
import { Consultant } from '../../../dashboard/consultant/entities/consultant.entity';
import {permsAuth} from "../../../auth/entities/auth.entity";


@Entity('activity_book')
export class Book {
  @PrimaryGeneratedColumn()
  book_id: number;
  @Column()
  consultant_id: string;
  @Column()
  consultant_fullname: string;
  @Column()
  id: string;
  @Column()
  fullname: string;
  @Column('datetime', {
    nullable: true,
  })
  born_date: Date;
  @Column('timestamp')
  book_date: Date;
  @Column()
  book_phone: string;
  @Column('simple-json')
  book_tags: { tags_category_id: number; tags_category_title: string };
  @Column({ default: 'unvalidated' })
  status: string;
  @CreateDateColumn()
  book_created_on: Date;
  @UpdateDateColumn()
  book_updated_on: Date;
  @Column({ default: 0 })
  @IsOptional()
  rating: number;
  @Column({ default: "" })
  @IsOptional()
  comment: string;

  @ManyToOne(() => Consultant, (Consultant) => Consultant.books)
  consultant: Consultant

  @ManyToOne(() => permsAuth, (permsAuth) => permsAuth.books)
  permsAuth: permsAuth




  // @OneToOne(() => permsAuth, (permsAuth) => permsAuth.consultant) // specify inverse side as a second parameter
  // @JoinColumn({name:'user_id'})
  // permsAuth: permsAuth
  //
}
