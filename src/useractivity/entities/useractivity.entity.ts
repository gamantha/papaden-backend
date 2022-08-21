import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Consultant } from "../../dashboard/consultant/entities/consultant.entity";
import { permsAuth } from "../../auth/entities/auth.entity";

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


  // @OneToOne(() => permsAuth)
  // @JoinColumn()
  // permsAuth: permsAuth

}
