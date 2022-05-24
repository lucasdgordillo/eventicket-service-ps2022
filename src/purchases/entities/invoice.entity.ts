import { Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { InvoiceDetailEntity } from "./invoiceDetail.entity";
import { PurchaseEntity } from "./purchase.entity";

export enum PaymentType {
  VISA_DEBIT = "visa_debit",
  VISA_CREDIT = "visa_credit",
  MASTERCARD_DEBIT = "mastercard_debit",
  MASTERCARD_CREDIT = "mastercard_credit"
}

@Entity('invoices')
export class InvoiceEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "enum", enum: PaymentType })
  payment_type: PaymentType;

  @Column({ nullable: false }) // Total sin comision de service charge
  total_without_fee: number;

  @Column({ nullable: false }) // Total con comision de service charge
  total_with_fee: number;

  @OneToOne(() => PurchaseEntity, (purchase) => purchase.invoice)
  purchase: PurchaseEntity;

  @Column({ type: 'date' })
  payment_date: string;

  @OneToMany(() => InvoiceDetailEntity, (invoiceDetail) => invoiceDetail.invoice, { cascade: true })
  invoice_details: InvoiceDetailEntity[]

  @CreateDateColumn()
  createdAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}