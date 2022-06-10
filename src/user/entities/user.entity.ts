import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Role } from '../models/role.enum';
import { EventEntity } from 'src/events/entities/event.entity';
import { RrppEntity } from './rrpp.entity';
import { ProvinceEntity } from 'src/shared/entities/province.entity';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column({ select: false })
  password: string;

  @Column({ type: 'enum', enum: Role, default: Role.USER })
  role: Role;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ nullable: true }) // Uso exclusivo para productoras
  displayName: string;

  @Column()
  dniNumber: string;

  @Column()
  phoneNumber: string;

  @OneToMany(() => EventEntity, (event) => event.productor)
  events: EventEntity[];

  @OneToMany(() => RrppEntity, (event) => event.productor)
  rrpps: RrppEntity[];

  @ManyToOne(() => ProvinceEntity)
  @JoinColumn()
  province: ProvinceEntity;

  @ManyToOne(() => UserEntity)
  @JoinColumn()
  createdBy: UserEntity;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}