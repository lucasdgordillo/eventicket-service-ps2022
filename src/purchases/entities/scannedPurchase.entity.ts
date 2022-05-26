import { EventEntity } from "src/events/entities/event.entity";
import { UserEntity } from "src/user/entities/user.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('scaneedPurchases')
export class ScannedPurchaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'date' })
  scanned_date: string;

  @Column({ nullable: false })
  purchase_code: string;

  @ManyToOne(() => UserEntity)
  @JoinColumn()
  checker: UserEntity;

  @ManyToOne(() => EventEntity)
  @JoinColumn()
  event: EventEntity;

  @CreateDateColumn()
  createdAt: Date;
}