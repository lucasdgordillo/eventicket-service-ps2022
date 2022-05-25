import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EventPriceDto } from '../dtos/eventPrice.dto';
import { EventPriceEntity } from '../entities/eventPrice.entity';

@Injectable()
export class EventPricesService {

  constructor(
    @InjectRepository(EventPriceEntity)
    private readonly eventPricesRepository: Repository<EventPriceEntity>
  ) {}

  async updateEventPrices(eventId: number, newPrices: EventPriceDto[] = []) {
    newPrices.forEach(eventPrice => {
      if (eventPrice.action === "ADD") {
        const price = this.eventPricesRepository.create({ name: eventPrice.name, price: eventPrice.price, event: { id: eventId }});
        this.eventPricesRepository.save(price);
      } else if (eventPrice.action === "EDIT") {
        this.eventPricesRepository.update(eventPrice.id, { name: eventPrice.name, price: eventPrice.price });
      } else {
        this.eventPricesRepository.softDelete(eventPrice.id);
      }
    });

    return await newPrices;
  }
}