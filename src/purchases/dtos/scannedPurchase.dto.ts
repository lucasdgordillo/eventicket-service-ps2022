import { IsNotEmpty, IsOptional, IsString } from "class-validator";
import { EventEntity } from "src/events/entities/event.entity";
import { PurchaseEntity } from "../entities/purchase.entity";
import { ScannedPurchaseStatus } from "../entities/scannedPurchase.entity";

export class ScannedPurchaseDto {
  @IsNotEmpty()
  event: EventEntity;

  @IsNotEmpty()
  purchase: PurchaseEntity;

  @IsNotEmpty()
  @IsString()
  scanned_date: string;

  @IsNotEmpty()
  @IsString()
  purchase_code: string;

  @IsOptional()
  status: ScannedPurchaseStatus;
}