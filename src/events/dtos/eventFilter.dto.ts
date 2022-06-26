import { IsOptional, IsString } from "class-validator";
import { UserEntity } from "src/user/entities/user.entity";
import { EventCategoriesEntity } from "../entities/eventCategory.entity";
import { EventPlaceEntity } from "../entities/eventPlace.entity";

export class EventFilterDto {
  @IsString()
  @IsOptional()
  title: string;

  @IsString()
  @IsOptional()
  artist: string;

  @IsOptional()
  productor: UserEntity;

  @IsOptional()
  category: EventCategoriesEntity;

  @IsOptional()
  place: EventPlaceEntity;
}