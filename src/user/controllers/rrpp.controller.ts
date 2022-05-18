import { Body, Controller, Delete, Get, Param, Post, Put, Request } from "@nestjs/common";
import { RrppDto } from "../dtos/rrpp.dto";
import { RrppService } from "../services/rrpp.service";

@Controller('rrpps')
export class RrppController {
  constructor(
    private rrppService: RrppService
  ) {}

  @Post('create')
  async createRrpp(@Body() rrppData: RrppDto) {
    const data = this.rrppService.create(rrppData);
    return { message: 'Create Success', data };
  }

  @Put(':id')
  async updateRrpp(@Param('id') id: number, @Body() newData: RrppDto) {
    const data = this.rrppService.update(id, newData);
    return { message: 'Update Success' };
  }

  @Delete(':id')
  async deleteRrpp(@Param('id') id: number) {
    const data = this.rrppService.delete(id);
    return { message: 'Delete Success' };
  }

  @Get()
  async getAllRrpps() {
    const data = await this.rrppService.getAll();
    return { data };
  }

  @Get(':id')
  async getRrpp(@Param('id') id: number) {
    const data = await this.rrppService.getById(id);
    return { data };
  }
}