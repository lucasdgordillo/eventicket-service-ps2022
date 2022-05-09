import { Body, Controller, Delete, Get, Param, Post, Put, Request, UseGuards } from '@nestjs/common';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { EventPlaceDto } from '../dtos/eventPlace.dto';
import { EventPlacesService } from '../services/eventPlaces.service';

@Controller('event-places')
export class EventPlacesController {
  constructor(
    private eventPlacesService: EventPlacesService
  ) {}
  
  @Post('create')
  async createEvent(@Body() eventPlaceData: EventPlaceDto) {
    const data = this.eventPlacesService.createEventPlace(eventPlaceData);
    return { message: 'Create Success', data };
  }

  @Put(':id')
  async updateEvent(@Param('id') id: number, @Body() eventPlaceNewData: EventPlaceDto) {
    const data = this.eventPlacesService.updateEventPlace(id, eventPlaceNewData);
    return { message: 'Update Success' };
  }

  @Delete(':id')
  async deleteEvent(@Param('id') id: number) {
    const data = this.eventPlacesService.deleteEventPlace(id);
    return { message: 'Delete Success' };
  }

  @Get()
  async getEvents() {
    const data = await this.eventPlacesService.getAllPlaces();
    return { data };
  }

  @Get(':id')
  async getEvent(@Param('id') id: number) {
    const data = await this.eventPlacesService.getEventPlaceById(id);
    return { data };
  }
}