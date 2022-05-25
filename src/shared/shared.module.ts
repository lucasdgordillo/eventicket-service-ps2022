import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ImageController } from './controllers/image.controller';
import { ProvinceController } from './controllers/province.controller';
import { ProvinceEntity } from './entities/province.entity';
import { ProvinceService } from './services/province.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([ ProvinceEntity ])
  ],
  providers: [ ProvinceService ],
  controllers: [ ProvinceController, ImageController ]
})
export class SharedModule {}
