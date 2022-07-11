import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('admin_config_sex')
export class Sex {
  @PrimaryGeneratedColumn()
  sex_category_id: number;
  @Column()
  sex_category_title: string;
}
