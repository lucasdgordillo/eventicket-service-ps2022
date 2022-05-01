import { ProvinceEntity } from 'src/shared/entities/province.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { EventEntity } from './event.entity';

@Entity('eventPrices')
export class EventPriceEntity {
  @PrimaryGeneratedColumn()
  id: number;

  // Nombre de la tanda del evento
  @Column()
  name: string;

  @Column()
  price: number;

  @ManyToOne(() => EventEntity, event => event.prices)
  event: EventEntity;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}