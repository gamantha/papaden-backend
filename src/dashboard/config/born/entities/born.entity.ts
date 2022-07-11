import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('admin_config_born')
export class Born {
  @PrimaryGeneratedColumn()
  born_category_id: number;
  @Column()
  born_start_year: number;
  @Column()
  born_end_year: number;
  @Column()
  born_category_title: string;
}
