import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
enum EventPriceAction {
  AddPrince = "ADD",
  EditPrince = "EDIT",
  RemovePrince = "REMOVE"
}

export class EventPriceDto {
  @IsNotEmpty()
  @IsNumber()
  @IsOptional()
  id: number;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  price: number;

  @IsNotEmpty()
  action: EventPriceAction;
}