import { UserEntity } from 'src/user/entities/user.entity';
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
import { EventCategoriesEntity } from './eventCategory.entity';
import { EventPlaceEntity } from './eventPlace.entity';
import { EventPriceEntity } from './eventPrice.entity';

@Entity('events')
export class EventEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ nullable: true })
  description: string;

  @Column()
  artist: string;

  @Column({ nullable: true })
  imagePath: string;

  @ManyToOne(() => UserEntity, (user) => user.events)
  productor: UserEntity;

  @ManyToOne(() => EventCategoriesEntity)
  @JoinColumn()
  category: EventCategoriesEntity;

  @ManyToOne(() => EventPlaceEntity)
  @JoinColumn()
  place: EventPlaceEntity;

  @OneToMany(() => EventPriceEntity, eventPrice => eventPrice.event, { eager: true, cascade: true })
  prices: EventPriceEntity[];

  // Fecha del evento gral (ej 18/03/2022)
  @Column({ type: 'date' })
  date: string;

  // Hora de comienzo del evento
  @Column({ type: 'time' })
  startTime: string;

  // // Hora de finalizacion del evento
  @Column({ type: 'time' })
  endTime: string;

  // Fecha y hora de inicializacion de venta
  @Column({ type: 'date' })
  releaseSellDateTime: string;
  
  // Fecha y hora de finalizacion de venta
  @Column({ type: 'date' })
  endSellDateTime: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}