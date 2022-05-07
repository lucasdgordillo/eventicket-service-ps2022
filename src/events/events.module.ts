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
import { EventPlacesService } from './services/eventPlaces.service';
import { EventPlacesController } from './controllers/eventPlaces.controller';
import { EventPricesController } from './controllers/eventPrices.controller';
import { EventPricesService } from './services/eventPrinces.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([ EventEntity, EventCategoriesEntity, EventPlaceEntity, EventPriceEntity ])
  ],
  providers: [EventsService, EventCategoriesService, EventPlacesService, EventPricesService],
  controllers: [EventsController, EventCategoriesController, EventPlacesController, EventPricesController]
})
export class EventsModule {}
