
   
import { IsNotEmpty, IsString } from 'class-validator';
import { ProvinceEntity } from 'src/shared/entities/province.entity';

export class EventPlaceDto {
  
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  address: string;

  @IsNotEmpty()
  @IsString()
  latitude: string;

  @IsNotEmpty()
  @IsString()
  longitude: string;

  @IsNotEmpty()
  // @IsNumber()
  province: ProvinceEntity;
}