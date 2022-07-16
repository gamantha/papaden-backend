import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('activity_book')
export class Book {
  @PrimaryGeneratedColumn()
  book_id: number;
  @Column()
  consultant_id: string;
  @Column()
  id: string;
  @Column()
  fullname: string;
  @Column()
  born_category_title: string;
  @Column('timestamp')
  book_date: Date;
  @Column()
  book_phone: string;
  @Column('simple-json')
  book_tags: { tags_category_id: number; tags_category_title: string };
  @CreateDateColumn()
  book_created_on: Date;
  @UpdateDateColumn()
  book_updated_on: Date;
}
