import { EventEntity } from "src/events/entities/event.entity";
import { RrppEntity } from "src/user/entities/rrpp.entity";
import { UserEntity } from "src/user/entities/user.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { InvoiceEntity } from "./invoice.entity";

export enum PurchaseStatus {
  NOT_VERIFIED = "not_verified", // Cuando esta pendiente de revision
  VERIFIED = "verified", // Cuando fue verificado por un usuario verificador
  REJECTED = "rejected", // Cuando el ticket fue rechazado
  EXPIRED = "expired" // Cuando la fecha del evento ya paso
}

@Entity('purchases')
export class PurchaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => UserEntity)
  @JoinColumn()
  user: UserEntity;

  @ManyToOne(() => UserEntity)
  @JoinColumn()
  productor: UserEntity;

  @ManyToOne(() => EventEntity)
  @JoinColumn()
  event: EventEntity;

  @OneToOne(() => InvoiceEntity, (invoice) => invoice.purchase, { cascade: true })
  @JoinColumn()
  invoice: InvoiceEntity;

  @ManyToOne(() => RrppEntity)
  @JoinColumn()
  rrpp: RrppEntity;

  @Column({ type: "enum", enum: PurchaseStatus, default: PurchaseStatus.NOT_VERIFIED })
  status: PurchaseStatus;

  @Column()
  purchase_code: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}