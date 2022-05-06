import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from "@nestjs/common";
import { JwtGuard } from "src/auth/guards/jwt.guard";
import { EventCategoryDto } from "../dtos/eventCategory.dto";
import { EventCategoriesService } from "../services/eventCategories.service";

@Controller('event-categories')
export class EventCategoriesController {
  constructor(
    private eventCategoriesService: EventCategoriesService
  ) {}

  @UseGuards(JwtGuard)
  @Post('create')
  async createEventCategory(@Body() categoryObj: EventCategoryDto) {
    const data = this.eventCategoriesService.createCategory(categoryObj.name);
    return { message: 'Create Success', data };
  }

  @UseGuards(JwtGuard)
  @Put(':id')
  async updateEvent(@Param('id') id: number, @Body() categoryObj: EventCategoryDto) {
    const data = this.eventCategoriesService.updateCategory(id, categoryObj.name);
    return { message: 'Update Success' };
  }

  @UseGuards(JwtGuard)
  @Delete(':id')
  async deleteEvent(@Param('id') id: number) {
    const data = this.eventCategoriesService.deleteCategory(id);
    return { message: 'Delete Success' };
  }

  @UseGuards(JwtGuard)
  @Get()
  async getEvents() {
    const data = await this.eventCategoriesService.getAllCategories();
    return { data };
  }

  @UseGuards(JwtGuard)
  @Get(':id')
  async getEvent(@Param('id') id: number) {
    const data = await this.eventCategoriesService.getCategoryById(id);
    return { data };
  }
}