import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from "@nestjs/common";
import { JwtGuard } from "src/auth/guards/jwt.guard";
import { EventCategoryDto } from "../dtos/eventCategory.dto";
import { EventCategoriesService } from "../services/eventCategories.service";

@Controller('event-categories')
export class EventCategoriesController {
  constructor(
    private eventCategoriesService: EventCategoriesService
  ) {}

  @Post('create')
  async createCategory(@Body() categoryObj: EventCategoryDto) {
    const data = this.eventCategoriesService.createCategory(categoryObj.name);
    return { message: 'Create Success', data };
  }

  @Put(':id')
  async updateCategory(@Param('id') id: number, @Body() categoryObj: EventCategoryDto) {
    const data = this.eventCategoriesService.updateCategory(id, categoryObj.name);
    return { message: 'Update Success' };
  }

  @Delete(':id')
  async deleteCategory(@Param('id') id: number) {
    const data = this.eventCategoriesService.deleteCategory(id);
    return { message: 'Delete Success' };
  }

  @Get()
  async getEvents() {
    const data = await this.eventCategoriesService.getAllCategories();
    return { data };
  }

  @Get(':id')
  async getEvent(@Param('id') id: number) {
    const data = await this.eventCategoriesService.getCategoryById(id);
    return { data };
  }
}