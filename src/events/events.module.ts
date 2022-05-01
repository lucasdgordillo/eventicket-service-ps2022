import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventEntity } from './entities/event.entity';
import { EventsService } from './services/events.service';
import { EventsController } from './controllers/events.controller';
import { EventCategoriesEntity } from './entities/eventCategory.entity';
import { EventPlaceEntity } from './entities/eventPlace.entity';
import { EventPriceEntity } from './entities/eventPrice.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ EventEntity, EventCategoriesEntity, EventPlaceEntity, EventPriceEntity ])
  ],
  providers: [EventsService],
  controllers: [EventsController]
})
export class EventsModule {}
