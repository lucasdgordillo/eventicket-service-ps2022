import { Body, Controller, Delete, Get, Param, Post, Put, Request, UseGuards } from '@nestjs/common';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { EventDto } from '../dtos/event.dto';
import { EventsService } from '../services/events.service';

@Controller('events')
export class EventsController {
  constructor(
    private eventsService: EventsService
  ) {}
  
  @Post('create')
  async createEvent(@Body() eventData: EventDto, @Request() req) {
    const data = this.eventsService.createEvent(eventData, req.user);
    return { message: 'Create Success', data };
  }

  @Put(':id')
  async updateEvent(@Param('id') id: number, @Body() eventNewData: EventDto) {
    const data = this.eventsService.updateEvent(id, eventNewData);
    return { message: 'Update Success' };
  }

  @Delete(':id')
  async deleteEvent(@Param('id') id: number) {
    const data = this.eventsService.deleteEvent(id);
    return { message: 'Delete Success' };
  }

  @Get()
  async getEvents() {
    const data = await this.eventsService.getAllEvents();
    return { data };
  }

  @Get(':id')
  async getEvent(@Param('id') id: number) {
    const data = await this.eventsService.getEventById(id);
    return { data };
  }
}