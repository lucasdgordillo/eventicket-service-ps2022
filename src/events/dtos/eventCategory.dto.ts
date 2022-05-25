import { IsNotEmpty, IsString } from "class-validator";

export class EventCategoryDto {
  
  @IsNotEmpty()
  @IsString()
  name: string;
}