import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { InvoiceEntity } from "./invoice.entity";

@Entity('invoiceDetails')
export class InvoiceDetailEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: string; // Nombre de la tanda que compro

  @Column({ nullable: false })
  unit_price: number;

  @Column({ nullable: false })
  quantity: number;

  @ManyToOne(() => InvoiceEntity, (invoice) => invoice.invoice_details)
  invoice: InvoiceEntity;

  @CreateDateColumn()
  createdAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}