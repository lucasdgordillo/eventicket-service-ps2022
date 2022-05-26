import { IsNotEmpty, IsOptional } from "class-validator";
import { EventEntity } from "src/events/entities/event.entity";
import { RrppEntity } from "src/user/entities/rrpp.entity";
import { UserEntity } from "src/user/entities/user.entity";
import { InvoiceEntity } from "../entities/invoice.entity";
import { PurchaseStatus } from "../entities/purchase.entity";

export class PurchaseDto {
  @IsNotEmpty()
  productor: UserEntity;

  @IsNotEmpty()
  event: EventEntity;

  @IsNotEmpty()
  invoice: InvoiceEntity;

  @IsOptional()
  rrpp: RrppEntity;

  @IsOptional()
  status: PurchaseStatus;
}