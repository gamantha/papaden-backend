import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('activity_recipient_register')
export class RecipientReg {
  @PrimaryGeneratedColumn()
  regs_id: number;
  @Column()
  rec_cat_title: string;
  @Column()
  id: string;
  @Column()
  regs_fullname: string;
  @Column()
  regs_borndate: Date;
  @Column()
  regs_phone: string;
  @Column()
  regs_city: string;
  @Column()
  regs_edu: string;
  @Column({ default: "" })
  regs_volunteer: string;
  @Column({ default: "unvalidated" })
  status: string;
  @CreateDateColumn()
  regs_created_on: Date;
  @UpdateDateColumn()
  regs_updated_on: Date;
}
