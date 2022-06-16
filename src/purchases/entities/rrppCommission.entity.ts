import { EventEntity } from "src/events/entities/event.entity";
import { RrppEntity } from "src/user/entities/rrpp.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('rrppCommissions')
export class RrppCommissionEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => RrppEntity)
  @JoinColumn()
  rrpp: RrppEntity;

  @ManyToOne(() => EventEntity)
  @JoinColumn()
  event: EventEntity;

  @Column({ nullable: false })
  commission_percentage: number;

  @Column({ nullable: false })
  commission_total: number;

  @CreateDateColumn()
  createdAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}