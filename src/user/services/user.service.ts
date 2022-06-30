import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../entities/user.entity';
import { Role } from '../models/role.enum';
import { User } from '../models/user.interface';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>
  ) {}

  async getUserInformation(user: User) {
    return await this.userRepository.findOne({ relations: { province: true }, where: { id: user.id }});
  }

  async getAllUsersByCreatorId(user: User) {
    return await this.userRepository.find({ relations: { province: true }, where: { createdBy: user }});
  }

  async getAllProductorUsers() {
    return await this.userRepository.find({ where: { role: Role.PRODUCTOR }});
  }

  async update(id: number, newData: User) {
    return await this.userRepository.update(id, newData);
  }
}
