import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { EventCategoriesEntity } from "../entities/eventCategory.entity";

@Injectable()
export class EventCategoriesService {

  constructor(
    @InjectRepository(EventCategoriesEntity)
    private readonly eventCategoryRepository: Repository<EventCategoriesEntity> 
  ) {}

  async createCategory(categoryName: string) {
    const category = this.eventCategoryRepository.create({ name: categoryName });
    return await this.eventCategoryRepository.save(category);
  }

  async updateCategory(id: number, newCategoryName: string) {
    return await this.eventCategoryRepository.update(id, { name: newCategoryName });
  }

  async deleteCategory(id: number) {
    return await this.eventCategoryRepository.softDelete(id);
  }

  async getAllCategories() {
    return await this.eventCategoryRepository.find();
  }

  async getCategoryById(id: number) {
    return await this.eventCategoryRepository.findOne({ where: [{ id }]});
  }
}