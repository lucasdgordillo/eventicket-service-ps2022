import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { EventDto } from '../dtos/event.dto';
import { EventEntity } from '../entities/event.entity';

@Injectable()
export class EventsService {

  constructor(
    @InjectRepository(EventEntity)
    private readonly eventRepository: Repository<EventEntity> 
  ) {}

  async createEvent(eventData: EventDto, user: UserEntity) {
    const event = this.eventRepository.create({ ...eventData, productor: user });
    return await this.eventRepository.save(event);
  }

  async updateEvent(id: number, eventNewData: EventDto) {
    return await this.eventRepository.update(id, eventNewData);
  }

  async deleteEvent(id: number) {
    return await this.eventRepository.softDelete(id);
  }

  async getAllEvents() {
    return await this.eventRepository.find();
  }

  async getEventById(id: number) {
    return await this.eventRepository.findOne({ where: [{ id }]});
  }
}
