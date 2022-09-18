import {
  AfterLoad,
  Column,
  Entity,
  Generated,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn
} from "typeorm";
import { profilImage, Useractivity } from "../../../useractivity/entities/useractivity.entity";
import { permsAuth } from "../../../auth/entities/auth.entity";
import { Book } from '../../../useractivity/books/entities/book.entity';

@Entity('admin_consultant')
export class Consultant {
  @PrimaryGeneratedColumn('uuid')
  // @Generated('uuid')
  consultant_id: string;
  @Column({
    nullable:true, unique: true
})
  user_id: string;
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
  @Column({
    nullable: true,
  })
  consultant_profil_url: string;
  @Column({ default: 0 })
  consultant_rating: number;

  @OneToOne(() => permsAuth, (permsAuth) => permsAuth.consultant) // specify inverse side as a second parameter
  @JoinColumn({name:'user_id'})
  permsAuth: permsAuth

  @AfterLoad()
  renameURL() {
    if (this.consultant_profil_url != null) {
      var url = this.consultant_profil_url.substr(5);
      this.consultant_profil_url = "http://202.67.10.240:3001" + url.replace(/\\/g, "/")
    }

  }

  @OneToMany(type => Book, Book => Book.consultant)
  books: Book[];


  // @ManyToOne(type => profilImage, profilimage => profilimage.id)
  // @JoinColumn()
  // profilimage: profilImage;

}
