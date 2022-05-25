import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ProvinceEntity } from "../entities/province.entity";

@Injectable()
export class ProvinceService {
  constructor(
    @InjectRepository(ProvinceEntity)
    private readonly provinceRepository: Repository<ProvinceEntity> 
  ) {}

  async getAll() {
    return await this.provinceRepository.find({ order: { name: "ASC" }});
  }
}