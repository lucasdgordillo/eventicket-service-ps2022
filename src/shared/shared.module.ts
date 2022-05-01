import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProvinceEntity } from './entities/province.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ ProvinceEntity ])
  ]
})
export class SharedModule {}
