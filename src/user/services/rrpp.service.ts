import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { RrppDto } from "../dtos/rrpp.dto";
import { RrppEntity } from "../entities/rrpp.entity";
import { UserEntity } from "../entities/user.entity";

@Injectable()
export class RrppService {
  constructor(
    @InjectRepository(RrppEntity)
    private readonly rrppRepository: Repository<RrppEntity>
  ) {}

  async create(rrppData: RrppDto) {
    const event = this.rrppRepository.create({ ...rrppData });
    return await this.rrppRepository.save(event);
  }

  async update(id: number, newData: RrppDto) {
    return await this.rrppRepository.update(id, newData);
  }

  async delete(id: number) {
    return await this.rrppRepository.softDelete(id);
  }

  async getAll() {
    return await this.rrppRepository.find();
  }

  async getById(id: number) {
    return await this.rrppRepository.findOne({ where: [{ id }]});
  }
}