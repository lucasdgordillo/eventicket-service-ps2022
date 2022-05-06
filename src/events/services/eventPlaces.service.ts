import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EventPlaceDto } from '../dtos/eventPlace.dto';
import { EventPlaceEntity } from '../entities/eventPlace.entity';

@Injectable()
export class EventPlacesService {

  constructor(
    @InjectRepository(EventPlaceEntity)
    private readonly eventPlacesRepository: Repository<EventPlaceEntity> 
  ) {}

  async createEventPlace(eventPlaceData: EventPlaceDto) {
    const event = this.eventPlacesRepository.create({ ...eventPlaceData });
    return await this.eventPlacesRepository.save(event);
  }

  async updateEventPlace(id: number, newEventPlaceData: EventPlaceDto) {
    return await this.eventPlacesRepository.update(id, newEventPlaceData);
  }

  async deleteEventPlace(id: number) {
    return await this.eventPlacesRepository.softDelete(id);
  }

  async getAllPlaces() {
    return await this.eventPlacesRepository.find();
  }

  async getEventPlaceById(id: number) {
    return await this.eventPlacesRepository.findOne({ where: [{ id }]});
  }
}
