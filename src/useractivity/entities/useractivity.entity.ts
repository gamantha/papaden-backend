import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export class Useractivity {}

@Entity('profil_image')
export class profilImage {
  @PrimaryGeneratedColumn()
  profil_id: number;
  @Column()
  id: string;
  @Column()
  profil_filename: string;
  @Column()
  profil_path: string;
  @Column()
  profil_mimetype: string;
}
