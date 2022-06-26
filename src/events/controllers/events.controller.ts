import { Body, Controller, Delete, Get, HttpException, Param, Post, Put, Query, Request, UseGuards } from '@nestjs/common';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { EventDto } from '../dtos/event.dto';
import { EventFilterDto } from '../dtos/eventFilter.dto';
import { EventPricesService } from '../services/eventPrinces.service';
import { EventsService } from '../services/events.service';

@Controller('events')
export class EventsController {
  constructor(
    private eventsService: EventsService,
    private eventPricesService: EventPricesService
  ) {}
  
  @UseGuards(JwtGuard)
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
    return this.eventsService.deleteEvent(id).then(async () => {
      return this.eventPricesService.deleteEventPrices(id).then(async () => {
        return { message: 'Delete Success' };  
      });
    }).catch(e => {
      throw new HttpException(e.response, e.status);
    });
  }

  @UseGuards(JwtGuard)
  @Get()
  async getEvents(@Query() filterData: EventFilterDto, @Request() req) {
    return this.eventsService.getAllEvents(req.user, filterData).then(async (events) => {
      return { data: events };
    }).catch(e => {
      throw new HttpException(e.response, e.status);
    });
  }

  @Get(':id')
  async getEvent(@Param('id') id: number) {
    const data = await this.eventsService.getEventById(id);
    return { data };
  }
}