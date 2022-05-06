import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventEntity } from './entities/event.entity';
import { EventsService } from './services/events.service';
import { EventsController } from './controllers/events.controller';
import { EventCategoriesEntity } from './entities/eventCategory.entity';
import { EventPlaceEntity } from './entities/eventPlace.entity';
import { EventPriceEntity } from './entities/eventPrice.entity';
import { EventCategoriesService } from './services/eventCategories.service';
import { EventCategoriesController } from './controllers/eventCategories.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([ EventEntity, EventCategoriesEntity, EventPlaceEntity, EventPriceEntity ])
  ],
  providers: [EventsService, EventCategoriesService],
  controllers: [EventsController, EventCategoriesController]
})
export class EventsModule {}
