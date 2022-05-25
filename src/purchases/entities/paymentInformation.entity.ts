import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { InvoiceEntity } from "./invoice.entity";

export enum PaymentType {
  VISA_DEBIT = "visa_debit",
  VISA_CREDIT = "visa_credit",
  MASTERCARD_DEBIT = "mastercard_debit",
  MASTERCARD_CREDIT = "mastercard_credit"
}

@Entity('paymentInformations')
export class PaymentInfoEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  holder_full_name: string;

  @Column({ nullable: false })
  billing_address: string;

  @Column({ nullable: false })
  card_number: string;

  @Column({ nullable: false })
  expiration_day: number;

  @Column({ nullable: false })
  expiration_year: number;

  @Column({ type: "enum", enum: PaymentType })
  payment_type: PaymentType;

  @Column({ nullable: false })
  ccv: number;

  @Column({ nullable: false })
  dniNumber: string;

  @OneToOne(() => InvoiceEntity, (invoice) => invoice.payment_info, { cascade: true })
  invoice: InvoiceEntity;

  @CreateDateColumn()
  createdAt: Date;
}