import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { InvoiceDetailEntity } from "./invoiceDetail.entity";
import { PaymentInfoEntity } from "./paymentInformation.entity";
import { PurchaseEntity } from "./purchase.entity";
@Entity('invoices')
export class InvoiceEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => PaymentInfoEntity, (paymentInfo) => paymentInfo.invoice)
  @JoinColumn()
  payment_info: PaymentInfoEntity;

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