import { Module } from '@nestjs/common';
import { UserService } from './services/user.service';
import { UserController } from './controllers/user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { RrppEntity } from './entities/rrpp.entity';
import { RrppService } from './services/rrpp.service';
import { RrppController } from './controllers/rrpp.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([ UserEntity, RrppEntity ])
  ],
  providers: [UserService, RrppService],
  controllers: [UserController, RrppController],
  exports: [ RrppService ]
})
export class UserModule {}
