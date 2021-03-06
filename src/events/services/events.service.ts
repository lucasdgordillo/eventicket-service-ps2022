import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/user/entities/user.entity';
import { Role } from 'src/user/models/role.enum';
import { Repository } from 'typeorm';
import { EventDto } from '../dtos/event.dto';
import { EventFilterDto } from '../dtos/eventFilter.dto';
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

  async getAllEvents(user: UserEntity, filterData: EventFilterDto) {
    if (user.role === Role.PRODUCTOR) {
      return await this.eventRepository.find({ relations: { productor: true, category: true, place: true }, where: { productor: { id: user.id }}});
    }

    if (Object.keys(filterData).length) {
      const query = this.eventRepository.createQueryBuilder("ev")
        .leftJoinAndSelect("ev.place", "pl")
        .leftJoinAndSelect("ev.category", "cat")
        .leftJoinAndSelect("ev.productor", "pr")

      if (filterData.title) {
        query.andWhere("LOWER(ev.title) LIKE :title", { title: `${filterData.title.toLowerCase()}%`});
      }

      if (filterData.artist) {
        query.andWhere("LOWER(ev.artist) LIKE :artist", { artist: `${filterData.artist.toLowerCase()}%`});
      }

      if (filterData.productor) {
        query.andWhere("pr.id = :productorId", { productorId: filterData.productor });
      }

      if (filterData.category) {
        query.andWhere("cat.id = :categoryId", { categoryId: filterData.category });
      }

      if (filterData.place) {
        query.andWhere("pl.id = :placeId", { placeId: filterData.place });
      }

      return await query.getMany();
    } else {
      return await this.eventRepository.find({ relations: { productor: true, category: true, place: true }});  
    }
  }

  async getEventById(id: number) {
    return await this.eventRepository.findOne({ relations: { productor: true, category: true, place: true, prices: true }, where: [{ id }]});
  }
}
