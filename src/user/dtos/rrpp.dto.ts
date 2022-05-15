import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { UserEntity } from "../entities/user.entity";

export class RrppDto {
  @IsNotEmpty()
  @IsString()
  fullName: string;

  @IsNotEmpty()
  @IsNumber()
  salePercentage: number;
}