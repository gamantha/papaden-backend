import { Column, Entity, Generated, PrimaryGeneratedColumn } from 'typeorm';

@Entity('admin_consultant')
export class Consultant {
  @PrimaryGeneratedColumn()
  @Generated('uuid')
  consultant_id: string;
  @Column()
  consultant_fullname: string;
  @Column()
  consultant_specialis: string;
  @Column()
  consultant_city: string;
  @Column()
  consultant_exp: string;
  @Column()
  consultant_phone: string;
  @Column()
  consultant_profil_url: string;
}
