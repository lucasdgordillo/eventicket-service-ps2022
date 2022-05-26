import { IsNotEmpty, IsString } from "class-validator";
import { EventEntity } from "src/events/entities/event.entity";

export class ScannedPurchaseDto {
  @IsNotEmpty()
  event: EventEntity;

  @IsNotEmpty()
  @IsString()
  scanned_date: string;

  @IsNotEmpty()
  @IsString()
  purchase_code: string;
}