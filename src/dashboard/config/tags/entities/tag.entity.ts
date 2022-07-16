import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('admin_config_tags')
export class Tag {
  @PrimaryGeneratedColumn()
  tags_category_id: number;
  @Column()
  tags_category_title: string;
}
