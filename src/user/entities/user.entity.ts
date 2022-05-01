import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Role } from '../models/role.enum';
import { EventEntity } from 'src/events/entities/event.entity';
import { RrppEntity } from './rrpp.entity';

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

  @Column()
  dniNumber: string;

  @Column()
  phoneNumber: string;

  @OneToMany(() => EventEntity, (event) => event.productor)
  events: EventEntity[];

  @OneToMany(() => RrppEntity, (event) => event.productor)
  rrpps: RrppEntity[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}