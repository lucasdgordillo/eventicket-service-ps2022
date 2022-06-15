import { Body, Controller, Delete, Get, HttpException, Param, Post, Put, Request, UseGuards } from "@nestjs/common";
import { JwtGuard } from "src/auth/guards/jwt.guard";
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

  @UseGuards(JwtGuard)
  @Get()
  async getAllRrpps(@Request() req) {
    return this.rrppService.getAll(req.user).then(async (rrpps) => {
      return { data: rrpps };
    }).catch(e => {
      throw new HttpException(e.response, e.status);
    });
  }

  @Get(':id')
  async getRrpp(@Param('id') id: number) {
    const data = await this.rrppService.getById(id);
    return { data };
  }

  @Get('/by-productor/:productorId')
  async getAllRrppByProductorId(@Param('productorId') productorId: number) {
    return this.rrppService.getByProductorId(productorId).then(async (rrpps) => {
      return { data: rrpps };
    }).catch(e => {
      throw new HttpException(e.response, e.status);
    });
  }
}