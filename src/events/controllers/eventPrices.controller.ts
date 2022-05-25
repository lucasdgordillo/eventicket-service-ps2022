import { Body, Controller, Param, Put, UseGuards } from '@nestjs/common';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { EventPriceDto } from '../dtos/eventPrice.dto';
import { EventPricesService } from '../services/eventPrinces.service';

@Controller('event-prices')
export class EventPricesController {
  constructor(
    private eventPricesService: EventPricesService
  ) {}
  
  @Put(':id')
  async updateEventPrices(@Param('id') eventId: number, @Body() newPrices: EventPriceDto[]) {
    const data = this.eventPricesService.updateEventPrices(eventId, newPrices);
    return { message: 'Update Prices Success', data: newPrices };
  }
}