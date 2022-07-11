import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('admin_config_recipient')
export class Recipient {
  @PrimaryGeneratedColumn()
  rec_cat_id: number;
  @Column()
  rec_cat_title: string;
}
