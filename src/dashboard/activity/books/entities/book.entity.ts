import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { IsOptional } from "class-validator";

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
  @Column({ default: "unvalidated" })
  status: string;
  @Column({ default: 0 })
  @IsOptional()
  rating: number;
  @CreateDateColumn()
  book_created_on: Date;
  @UpdateDateColumn()
  book_updated_on: Date;
}
