import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProvinceController } from './controllers/province.controller';
import { ProvinceEntity } from './entities/province.entity';
import { ProvinceService } from './services/province.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([ ProvinceEntity ])
  ],
  providers: [ ProvinceService ],
  controllers: [ ProvinceController ]
})
export class SharedModule {}
