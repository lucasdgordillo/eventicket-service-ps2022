
   
import { IsArray, IsDate, IsNotEmpty, IsNumber, isObject, IsObject, IsOptional, isString, IsString } from 'class-validator';
import { UserEntity } from 'src/user/entities/user.entity';
import { EventCategoriesEntity } from '../entities/eventCategory.entity';
import { EventPlaceEntity } from '../entities/eventPlace.entity';
import { EventPriceEntity } from '../entities/eventPrice.entity';

export class EventDto {
  
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsOptional()
  description: string;

  @IsNotEmpty()
  @IsString()
  artist: string;

  @IsString()
  @IsOptional()
  imagePath: string;
  
  @IsNotEmpty()
  @IsString()
  date: string;

  @IsNotEmpty()
  @IsString()
  startTime: string;

  @IsNotEmpty()
  @IsString()
  endTime: string;

  @IsNotEmpty()
  @IsString()
  releaseSellDateTime: string;

  @IsNotEmpty()
  @IsString()
  endSellDateTime: string;

  @IsNotEmpty()
  productor: UserEntity;

  @IsNotEmpty()
  category: EventCategoriesEntity;

  @IsNotEmpty()
  place: EventPlaceEntity;
  
  @IsArray()
  @IsOptional()
  prices: EventPriceEntity[];
}